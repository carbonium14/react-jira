import { QueryKey, useMutation, useQuery } from "react-query"
import { epic } from "types/epic"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options"

export const useEpics = (param?:Partial<epic>) => {
    const client = useHttp()
    return useQuery<epic[]>(['epics',param],()=>client('epics',{data:param}))
}
export const useAddEpic = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation((params:Partial<epic>)=>client(`epics`,{
        method:'POST',
        data:params
    }),useAddConfig(queryKey))
}
export const useDeleteEpic = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(({id}:{id:number})=>client(`epics/${id}`,{
        method:'DELETE'
    }),useDeleteConfig(queryKey))
}