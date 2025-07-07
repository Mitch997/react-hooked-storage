import { useState, useEffect, useCallback } from 'react';
import { getStorage } from '../utils/getStorage';

export function useStorage(key, initialValue, options = {}) {
    const storageType = getStorage(options.type);

    const readValue = () => {
        if (typeof window === 'undefined') return initialValue;
        try {
            const item = storageType.getItem(key);
            return item !== null ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(readValue);

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                storageType.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting Storage key "${key}":`, error);
        }
    }, [key, storedValue, storageType]);

    const remove = useCallback(() => {
        try {
            if (typeof window !== 'undefined') {
                storageType.removeItem(key);
                setStoredValue(initialValue);
            }
        } catch (error) {
            console.warn(`Error setting Storage key "${key}":`, error);

        }
    }, [key, initialValue, storageType]);

    useEffect(() => {
        setStoredValue(readValue());
    }, [key]);

    return [storedValue, setValue, remove];
}
