import { useMemo } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { cleanObject } from 'utils'
export const useUrlQueryParam = <K extends string>(keys:K[]) => {
    const [searchParams] = useSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    return [
        useMemo(()=>{
            return keys.reduce((prev,key)=>{
                return {...prev,[key]:searchParams.get(key)||''}
            },{} as {[key in K]:string})
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[searchParams])
        ,(params:Partial<{[key in K]:unknown}>)=>{
            return setSearchParams(params)
        }] as const
}
export const useSetUrlSearchParam = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    return (params:{[key in string]:unknown}) => {
        const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
        return setSearchParams(o)
    }
}