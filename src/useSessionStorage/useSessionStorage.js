import { useState, useEffect, useCallback } from 'react';

export function useSessionStorage(key, initialValue) {
    const readValue = () => {
        if (typeof window === 'undefined') return initialValue;
        try {
            const item = window.sessionStorage.getItem(key);
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
                window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting Storage key "${key}":`, error);

        }
    }, [key, storedValue]);

    const remove = useCallback(() => {
        try {
            if (typeof window !== 'undefined') {
                window.sessionStorage.removeItem(key);
                setStoredValue(initialValue);
            }
        } catch (error) {
            console.warn(`Error setting Storage key "${key}":`, error);

        }
    }, [key, initialValue]);

    useEffect(() => {
        setStoredValue(readValue());
    }, [key]);

    return [storedValue, setValue, remove];
}
