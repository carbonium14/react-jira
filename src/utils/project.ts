import { QueryKey, useMutation, useQuery } from "react-query"
import { Project } from "screens/project-list/list"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options"

export const useProject = (param?:Partial<Project>) => {
    const client = useHttp()
    return useQuery<Project[]>(['projects',param],()=>client('projects',{data:param}))
}
export const useEditProject = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation((params:Partial<Project>)=>client(`projects/${params.id}`,{
        method:'PATCH',
        data:params
    }),useEditConfig(queryKey))
}
export const useAddProject = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation((params:Partial<Project>)=>client(`projects`,{
        method:'POST',
        data:params
    }),useAddConfig(queryKey))
}
export const useDeleteProject = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(({id}:{id:number})=>client(`projects/${id}`,{
        method:'DELETE'
    }),useDeleteConfig(queryKey))
}
export const useProjectId = (id?:number) => {
    const client = useHttp()
    return useQuery<Project>(['project',{id}],()=>client(`projects/${id}`),{
        enabled:!!id
    })
}