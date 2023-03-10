import { QueryKey, useQueryClient } from "react-query";
import { task } from "types/task";
import { reorder } from "./reorder";

export const useConfig = (queryKey:QueryKey,callback:(target:any,old?:any[])=>any[]) => {
    const queryClient=useQueryClient()
    return {
        onSuccess:()=>queryClient.invalidateQueries(queryKey),
        async onMutate(target:any) {
            const previousItems=queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey,(old?:any[])=>{
                return callback(target,old)
            })
            return {previousItems}
        },
        onError(error:any,newItem:any,context:any) {
            queryClient.setQueryData(queryKey,(context as {previousItems:any[]}).previousItems)
        }
    }
}
export const useDeleteConfig = (queryKey:QueryKey) => useConfig(queryKey,(target,old)=>old?.filter(item=>item.id!==target.id)||[])
export const useEditConfig = (queryKey:QueryKey) => useConfig(queryKey,(target,old)=>old?.map(item=>item.id===target.id?{}:{...item,...target})||[])
export const useAddConfig = (queryKey:QueryKey) => useConfig(queryKey,(target,old)=>old?[...old,...target]:[])
export const useReorderKanbanConfig = (queryKey:QueryKey) =>useConfig(queryKey,(target,old)=>reorder({list:old,...target}))
export const useReorderTaskConfig = (queryKey:QueryKey) =>useConfig(queryKey,(target,old)=>{
    const orderList=reorder({list:old,...target}) as task[]
    return orderList.map((item)=>item.id===target.fromId?{...item,kanbanId:target.toKanbanId}:item)
})
