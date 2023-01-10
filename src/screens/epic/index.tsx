import { Button, List, Modal, Spin } from "antd"
import { Row, ScreenContainer } from "components/lib"
import dayjs from "dayjs"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useProjectInUrl } from "screens/kanban/util"
import { epic } from "types/epic"
import { useDeleteEpic, useEpics } from "utils/epic"
import { useTasks } from "utils/task"
import { CreateEpic } from "./create-epic"
import { useEpicSearchParams, useEpicsQueryKey } from "./util"

export const EpicScreen = () => {
    const {data:currentProject}=useProjectInUrl()
    const {data:epics}=useEpics(useEpicSearchParams())
    const {data:tasks}=useTasks({projectId:currentProject?.id})
    const {mutate:deleteAEpic}=useDeleteEpic(useEpicsQueryKey())
    const [epicCreateOpen,setEpicCreateOpen]=useState(false)
    const confirmDeleteEpic=(epic:epic)=>{
        Modal.confirm({
            okText:'确定',
            cancelText:'取消',
            title:`确定删除项目组${epic.name}吗?`,
            onOk() {
                return deleteAEpic({id:epic.id})
            }
        })
    }
    return (
        <ScreenContainer>
            <Row between={true}>
                <h1>{currentProject?.name}任务组</h1>
                <Button type="link" onClick={()=>setEpicCreateOpen(true)}></Button>
            </Row>
            <List style={{overflow:'scroll'}} dataSource={epics} itemLayout='vertical' renderItem={epic=><List.Item>
                <List.Item.Meta title={<Row between={true}>
                    <Spin>{epic.name}</Spin>
                    <Button type="link" onClick={()=>confirmDeleteEpic(epic)}>删除</Button>
                </Row>} description={<div>
                    <div>{'开始时间:'+dayjs(epic.start).format('YYYY-MM-DD')}</div>
                    <div>{'结束时间:'+dayjs(epic.end).format('YYYY-MM-DD')}</div>
                </div>}></List.Item.Meta>
                <div>
                    {tasks?.filter(task=>task.epicId===epic.id).map(task=><Link key={task.id} to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}>
                        {task.name}
                    </Link>)}
                </div>
            </List.Item>}></List>
            <CreateEpic onClose={()=>setEpicCreateOpen(false)} visible={epicCreateOpen}></CreateEpic>
        </ScreenContainer>
    )
}