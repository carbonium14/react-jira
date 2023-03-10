import { QueryKey, useMutation, useQuery } from "react-query"
import { task } from "types/task"
import { useHttp } from "./http"
import { sortprops } from "./kanban"
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from "./use-optimistic-options"

export const useTasks = (param?:Partial<task>) => {
    const client = useHttp()
    return useQuery<task[]>(['tasks',param],()=>client('tasks',{data:param}))
}
export const useEditTask = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation((params:Partial<task>)=>client(`tasks/${params.id}`,{
        method:'PATCH',
        data:params
    }),useEditConfig(queryKey))
}
export const useAddTask = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation((params:Partial<task>)=>client(`tasks`,{
        method:'POST',
        data:params
    }),useAddConfig(queryKey))
}
export const useDeleteTask = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(({id}:{id:number})=>client(`tasks/${id}`,{
        method:'DELETE'
    }),useDeleteConfig(queryKey))
}
export const useTaskId = (id?:number) => {
    const client = useHttp()
    return useQuery<task>(['task',{id}],()=>client(`tasks/${id}`),{
        enabled:!!id
    })
}
export const useReorderTask = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation((params:sortprops)=>{
        return client('tasks/reorder',{
            data:params,
            method:'POST'
        })
    },useReorderTaskConfig(queryKey))
}