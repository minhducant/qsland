import { Log } from "@utils/Log"
import { useRef } from "react"
import { isArray, isObject } from "underscore"

export function useHookForm<T>() {
    const ref = useRef<any>({})
    function Ref(key: string, value: any) {
        ref.current[key] = value
    }
    function get(key: string, type: any = undefined) {
        return ref.current[key]?.getValue(type)
    }
    function set(key: string, value: any, type?: any) {
        return ref.current[key]?.setValue(value, type)
    }
    function setAll(data: Record<string, any>) {
        if (isObject(data)) {
            Object.entries(data).forEach(([key, value]) => {
                return ref.current[key]?.setValue(value)
            })
        }
    }
    function getName(key: string, name: any = undefined) {
        if (isObject(ref.current[key]))
            if (ref.current[key][name] !== undefined) {
                if (typeof ref.current[key][name] === "function") {
                    return ref.current[key][name]()
                }
            }
    }
    function clear(key: string) {
        return ref.current[key]?.clearValue()
    }
    function clearMulti(keys: string[]) {
        Log.d('clearMulti')
        if (isObject(ref.current) && isArray(keys)) {
            keys.forEach(key => {
                Log.d('clearMulti2', key)
                ref.current[key]?.clearValue()
            })
        }
        return null
    }
    function clearAll() {
        if (isObject(ref.current)) {
            Object.keys(ref.current).forEach(key => {
                ref.current[key]?.clearValue()
            })
        }
        return null
    }

    function getAll() {
        if (isObject(ref.current)) {
            return Object.fromEntries(
                Object.keys(ref.current).map(key => [
                    key,
                    ref.current[key]?.getValue(),
                ]),
            )
        }
        return null
    }
    function handleFc(key: string, funcName: any, value?: any) {
        if (isObject(ref.current[key]))
            if (ref.current[key][funcName] !== undefined) {
                if (typeof ref.current[key][funcName] === "function") {
                    return ref.current[key][funcName](value)
                }
            }
    }
    return {
        Ref,
        set,
        get,
        getAll,
        clear,
        clearAll,
        getName,
        setAll,
        handleFc,
        clearMulti
    }
}
