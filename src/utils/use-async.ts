import { useState } from "react"

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
    const setData = (data:D) => setState({
        data,
        status: 'success',
        error: null
    })
    const setError = (error:Error) => setState({
        error,
        status: 'error',
        data: null
    })
    const run = (promise:Promise<D>) => {
        if(!promise||!promise.then) {
            throw new Error('请传入promise类型数据')
        }
        setState({...state,status:'loading'})
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
    }
    return {
        isIdle:state.status==='idle',
        isLoading:state.status==='loading',
        isError:state.status==='error',
        isSuccess:state.status==='success',
        run,
        setData,
        setError,
        ...state
    }
}