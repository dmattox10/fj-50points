/* from React community hooks for capacitor */
import { useState, useEffect, useCallback } from 'react';
import { Storage } from '@capacitor/storage'

export const useStorage = () => {

    const get = useCallback(async key => {
        const val = await Storage.get({ key });
        if (val) {
        return val.value;
        }
        return null;
    }, [])

    const set = useCallback(async (key, value) => {
        return Storage.set({ key, value: value });
    }, [])

    const remove = useCallback(async key => {
        return Storage.remove({ key });
    }, [])

    const getKeys = useCallback(async key => {
        return Storage.keys();
    }, [])

    const clear = useCallback(async key => {
        return Storage.clear();
    }, [])

    return { get, set, remove, getKeys, clear }
}

export const useStorageItem = (key, initialValue) => {

    const [storedValue, setStoredValue] = useState()

    useEffect(() => {
        const loadValue = async () => {
            try {
                const result = await Storage.get({ key })
                if (result.value == undefined && initialValue != undefined) {
                    result.value = typeof initialValue === 'string' ? initialValue : JSON.stringify(initialValue)
                    setValue(result.value)
                } else {
                    setStoredValue(typeof result.value === 'string' ? result.value : JSON.parse(result.value))
                }
            } catch (error) {
                return initialValue
            }
        }
        loadValue()
    }, [Storage, setStoredValue, initialValue, key])

    const setValue = async value => {
        try {
            setStoredValue(value)
            await Storage.set({ key, value: typeof value === 'string' ? value : JSON.stringify(value) })
        } catch (error) {
            console.error(error)
        }
    }

    return [
        storedValue,
        setValue
    ]
}