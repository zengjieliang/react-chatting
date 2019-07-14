import { useState, useEffect } from "react";
import { CellMeasurerCache } from "react-virtualized/dist/commonjs/CellMeasurer";

export function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

const measureCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 44
});

export function useMeasureCache(count, friend){
    //clear cache when friend changed
    useEffect(() => {
        measureCache.clearAll();
    }, [friend]);

    //clear cache when message removed
    useEffect(() => {
        if (count === 0) {
            measureCache.clearAll();
        }
    }, [count]);

    return measureCache;
}