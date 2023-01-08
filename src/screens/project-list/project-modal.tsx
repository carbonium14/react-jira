import { Button, Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { ProjectListActions, selectProjectModalOpen } from "./project-list.slice"

export const ProjectModal = () => {
    const dispatch = useDispatch()
    const projectModalOpen=useSelector(selectProjectModalOpen)
    return (
        <Drawer onClose={()=>dispatch(ProjectListActions.closeProjectModal())} width={'100%'} visible={projectModalOpen}>
            <Button onClick={()=>dispatch(ProjectListActions.closeProjectModal())}>关闭</Button>
        </Drawer>
    )
}