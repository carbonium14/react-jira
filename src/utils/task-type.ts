import { useQuery } from "react-query"
import { taskType } from "types/task-type"
import { useHttp } from "./http"

export const useTaskTypes = () => {
    const client = useHttp()
    return useQuery<taskType[]>(['taskTypes'],()=>client('taskTypes'))
}