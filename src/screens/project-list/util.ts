import { useMemo } from "react"
import { useProjectId } from "utils/project"
import { useUrlQueryParam } from "utils/url"

export const useProjectSearchParams = () => {
    const [param,setParam] = useUrlQueryParam(['name','personId'])
    return [
        useMemo(()=>{
            return {...param,personId:Number(param.personId)||undefined}
        },[param])
        ,setParam] as const
}
export const useProjectModal = () => {
    const [{projectCreate},setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    const [{editingProjectId},setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])
    const {data:editingProject,isLoading} = useProjectId(Number(editingProjectId))
    const open = () => setProjectCreate({projectCreate:true})
    const close = () => {
        setProjectCreate({projectCreate:undefined})
        setEditingProjectId({editingProjectId:undefined})
    }
    const startEdit = (id:number) => setEditingProjectId({editingProjectId:id})
    return {
        projectModalOpen:projectCreate==='true'||Boolean(editingProject),
        open,
        close,
        startEdit,
        isLoading,
        editingProject
    }
}