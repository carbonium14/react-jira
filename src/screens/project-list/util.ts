import { useMemo } from "react"
import { useProjectId } from "utils/project"
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url"

export const useProjectSearchParams = () => {
    const [param,setParam] = useUrlQueryParam(['name','personId'])
    return [
        useMemo(()=>{
            return {...param,personId:Number(param.personId)||undefined}
        },[param])
        ,setParam] as const
}
export const useProjectQueryKey = () => {
    const [params]=useProjectSearchParams()
    return ['projects',params]
}
export const useProjectModal = () => {
    const [{projectCreate},setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    const [{editingProjectId},setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])
    const setUrlParams=useSetUrlSearchParam()
    const {data:editingProject,isLoading} = useProjectId(Number(editingProjectId))
    const open = () => setProjectCreate({projectCreate:true})
    const close = () => setUrlParams({projectCreate:'',editingProjectId:''})
    const startEdit = (id:number) => setEditingProjectId({editingProjectId:id})
    return {
        projectModalOpen:projectCreate==='true'||Boolean(editingProjectId),
        open,
        close,
        startEdit,
        isLoading,
        editingProject
    }
}