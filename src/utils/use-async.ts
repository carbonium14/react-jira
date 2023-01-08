import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "utils"

interface state<D> {
    error: Error | null,
    data: D | null,
    status: 'idle' | 'loading' | 'error' | 'success'
}
const defaultConfig = {
    throwOnError: false
}
const defaultInitialState:state<null> = {
    status: 'idle',
    data: null,
    error: null
}
const useSafeDispatch=<T>(dispatch:(...args:T[])=>void)=>{
    const mountedRef=useMountedRef()
    return useCallback((...args:T[])=>(mountedRef.current?dispatch(...args):void(0)),[dispatch, mountedRef])
}
export const useAsync = <D>(initialState?:state<D>,initConfig?:typeof defaultConfig) => {
    const config = {...defaultConfig,...initConfig}
    const [state,dispatch] = useReducer((state:state<D>,action:Partial<state<D>>)=>({...state,...action}),{
        ...defaultInitialState,
        ...initialState
    })
    const [retry,setRetry] = useState(()=>()=>{})
    const safeDispatch = useSafeDispatch(dispatch)
    const setData = useCallback((data:D) => safeDispatch({
        data,
        status: 'success',
        error: null
    }),[safeDispatch])
    const setError = useCallback((error:Error) => safeDispatch({
        error,
        status: 'error',
        data: null
    }),[safeDispatch])
    const run = useCallback((promise:Promise<D>,runConfig?:{retry:()=>Promise<D>}) => {
        if(!promise||!promise.then) {
            throw new Error('请传入promise类型数据')
        }
        setRetry(()=>()=>{
            if(runConfig?.retry) {
                run(runConfig?.retry(),runConfig)
            }
        })
        safeDispatch({status:'loading'})
        return promise.then(data=>{
            setData(data)
            return data
        }).catch(error=>{
            setError(error)
            if(config.throwOnError) {
                return Promise.reject(error)
            } else {
                return error
            }
        })
    },[config.throwOnError, safeDispatch, setData, setError])
    return {
        isIdle:state.status==='idle',
        isLoading:state.status==='loading',
        isError:state.status==='error',
        isSuccess:state.status==='success',
        run,
        setData,
        setError,
        retry,
        ...state
    }
}