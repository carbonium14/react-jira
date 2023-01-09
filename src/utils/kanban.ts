import { useQuery } from "react-query"
import { kanban } from "types/kanban"
import { useHttp } from "./http"

export const useKanbans = (param?:Partial<kanban>) => {
    const client = useHttp()
    return useQuery<kanban[]>(['kanbans',param],()=>client('kanbans',{data:param}))
}