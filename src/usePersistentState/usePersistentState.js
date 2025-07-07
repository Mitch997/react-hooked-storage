import { useState, useEffect, useCallback, useRef } from 'react';
import { getStorage } from '../utils/getStorage';
export function usePersistentState(key, initialValue, options = {}) {
    const {
        ttl = null, // persistence in ms
        type = 'local',
        onExpire = null,
    } = options;

    const timeoutRef = useRef(null);

    const storage = getStorage(type)

    const readValue = () => {
        if (!storage) return initialValue;

        try {
            const item = storage.getItem(key);
            if (!item) return initialValue;

            const { value, expiresAt } = JSON.parse(item);

            if (expiresAt && Date.now() > expiresAt) {
                storage.removeItem(key);
                if (typeof onExpire === 'function') {
                    onExpire();
                }
                return initialValue;
            }

            return value;
        } catch {
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(readValue);

    const clearTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const setValue = useCallback((value) => {
        if (!storage) return;

        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            const expiresAt = ttl ? Date.now() + ttl : null;

            const data = { value: valueToStore, expiresAt };

            storage.setItem(key, JSON.stringify(data));
            setStoredValue(valueToStore);

            // Reset timer
            clearTimer();
            if (expiresAt) {
                timeoutRef.current = setTimeout(() => {
                    storage.removeItem(key);
                    setStoredValue(initialValue);
                    if (typeof onExpire === 'function') {
                        onExpire();
                    }
                }, expiresAt - Date.now());
            }
        } catch (error) {
            console.warn(`Error setting Storage key "${key}":`, error);

        }
    }, [key, ttl, storedValue, storage, initialValue]);

    const remove = useCallback(() => {
        if (!storage) return;
        try {
            storage.removeItem(key);
            setStoredValue(initialValue);
            clearTimer();
        } catch { }
    }, [key, initialValue, storage]);

    useEffect(() => {
        const item = storage?.getItem(key);
        if (!item) return;

        try {
            const { expiresAt } = JSON.parse(item);
            if (expiresAt && Date.now() < expiresAt) {
                timeoutRef.current = setTimeout(() => {
                    storage.removeItem(key);
                    setStoredValue(initialValue);
                    if (typeof onExpire === 'function') {
                        onExpire();
                    }
                }, expiresAt - Date.now());
            }
        } catch { }
    }, [key]);

    useEffect(() => {
        return () => clearTimer();
    }, []);

    return [storedValue, setValue, remove];
}
