import { QueryKey, useMutation, useQuery } from "react-query"
import { kanban } from "types/kanban"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options"

export const useKanbans = (param?:Partial<kanban>) => {
    const client = useHttp()
    return useQuery<kanban[]>(['kanbans',param],()=>client('kanbans',{data:param}))
}
export const useAddKanban = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation((params:Partial<kanban>)=>client(`kanbans`,{
        method:'POST',
        data:params
    }),useAddConfig(queryKey))
}
export const useDeleteKanban = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(({id}:{id:number})=>client(`kanbans/${id}`,{
        method:'DELETE'
    }),useDeleteConfig(queryKey))
}