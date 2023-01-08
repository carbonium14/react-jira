import { useCallback, useState } from "react"
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
export const useAsync = <D>(initialState?:state<D>,initConfig?:typeof defaultConfig) => {
    const config = {...defaultConfig,...initConfig}
    const [state,setState] = useState<state<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const [retry,setRetry] = useState(()=>()=>{})
    const mountedRef = useMountedRef()
    const setData = useCallback((data:D) => setState({
        data,
        status: 'success',
        error: null
    }),[])
    const setError = useCallback((error:Error) => setState({
        error,
        status: 'error',
        data: null
    }),[])
    const run = useCallback((promise:Promise<D>,runConfig?:{retry:()=>Promise<D>}) => {
        if(!promise||!promise.then) {
            throw new Error('请传入promise类型数据')
        }
        setRetry(()=>()=>{
            if(runConfig?.retry) {
                run(runConfig?.retry(),runConfig)
            }
        })
        setState((preState)=>({...preState,status:'loading'}))
        return promise.then(data=>{
            if(mountedRef.current) {
                setData(data)
            }
            return data
        }).catch(error=>{
            setError(error)
            if(config.throwOnError) {
                return Promise.reject(error)
            } else {
                return error
            }
        })
    },[config.throwOnError, mountedRef, setData, setError])
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