import { useQuery } from "react-query"
import { task } from "types/task"
import { useHttp } from "./http"

export const useTasks = (param?:Partial<task>) => {
    const client = useHttp()
    return useQuery<task[]>(['tasks',param],()=>client('tasks',{data:param}))
}