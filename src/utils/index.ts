import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown):boolean => {
    return value === 0 ? false : !value 
}
export const isVoid = (value:unknown) => {
    return value === undefined || value === null || value === ''
}
export const cleanObject = (object: {[key:string]:unknown}) => {
    const result = {...object}
    Object.keys(result).forEach(key=>{
        const value = result[key]
        if(isVoid(value)) {
            delete result.key
        }
    })
    return result
}
export const useMount = (callback:()=>void) =>{
    useEffect(()=>{
        callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
export const useDebounce = <V>(value:V,delay?:number):V => {
    const [debouncedValue,setDebouncedValue] = useState(value)
    useEffect(()=>{
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(timeout)
        }
    },[value,delay])
    return debouncedValue
}
export const useDocumentTitle = (title:string,keepOnUnmount:boolean=true) => {
    const oldTitle=useRef(document.title).current
    useEffect(()=>{
        document.title=title
    },[title])
    useEffect(()=>{
        return () => {
            if(keepOnUnmount===false) {
                document.title=oldTitle
            }
        }
    },[keepOnUnmount, oldTitle])
}
export const resetRoute = () => window.location.href = window.location.origin
export const useMountedRef = () => {
    const mountedRef = useRef(false)
    useEffect(()=>{
        mountedRef.current=true
        return () => {
            mountedRef.current=false
        }
    })
    return mountedRef
}