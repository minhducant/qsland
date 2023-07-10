import { Log } from "@utils/Log"
import { Map } from "immutable"
import { useEffect, useRef, useState } from "react"
import base64 from "react-native-base64";
import { isEqual } from "underscore"
import uuid from 'react-native-uuid';
let initData: { id_post: number, message: any } = {
    id_post: -1,
    message: null
}
let Store: { listeners: any, data: any } = {
    listeners: {},
    data: initData
}

export const useContext = () => {
    const onRefresh = useState<boolean>(false)[1]
    const prevData = useRef(Store.data)
    const ID = useRef<string>(uuid.v4())
    useEffect(() => {
        const register = (data: any) => {
            if (!isEqual(data, prevData.current)) {
                prevData.current = data;
                onRefresh(p => !p);
            }
        }
        if (Store.listeners[ID.current] === undefined)
            Store.listeners[ID.current] = register
        return () => {
            if (Store.listeners[ID.current]) delete Store.listeners[ID.current]
            Log.d1('Store', Store)
        }
    }, [])
    function setState(newData: any) {
        Store.data = { ...Store.data, ...newData }
        Object.keys(Store.listeners).forEach(key => {
            const render = Store.listeners[key]
            if (typeof render == "function") render(newData)
        })

    }
    function getStore() {
        Log.d1('Store', Store)
        return Store
    }
    return [Store.data, setState, getStore]
}
export const useMessage = () => {
    const [state, setState] = useContext()
    const setMessage = (message: any, type = "add") => {
        if (type == "del") return setState({ message: null })
        return setState({ message })
    }

    return {
        setMessage,
        message: state?.message,
        id: state?.id_post,
    }
}
