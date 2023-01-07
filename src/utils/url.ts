import { useMemo } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { cleanObject } from 'utils'
export const useUrlQueryParam = <K extends string>(keys:K[]) => {
    const [searchParams,setSearchParams] = useSearchParams()
    return [
        useMemo(()=>{
            return keys.reduce((prev,key)=>{
                return {...prev,[key]:searchParams.get(key)||''}
            },{} as {[key in K]:string})
        },[keys, searchParams])
        ,(params:Partial<{[key in K]:unknown}>)=>{
            const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
            return setSearchParams(o)
        }] as const
}