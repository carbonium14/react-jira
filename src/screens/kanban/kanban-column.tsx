import { kanban } from "types/kanban";
import { task } from "types/task";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from "./util";
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";
import React from "react";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

const TaskTypeIcon = ({id}:{id:number}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data:tasktypes}=useTaskTypes()
    const name = tasktypes?.find(tasktype=>tasktype.id===id)?.name
    if(!name) {
        return null
    }
    return <img src={name==='task'?taskIcon:bugIcon} alt=""/>
}
const TaskCard = ({task}:{task:task}) => {
    const {startEdit}=useTasksModal()
    const {name:keyword}=useTasksSearchParams()
    return <Card onClick={()=>startEdit(task.id)} key={task.id} style={{marginBottom:'0.5rem',cursor:'pointer'}}>
        <p>
            <Mark keyword={keyword} name={task.name}></Mark>
        </p>
        <p>
            <TaskTypeIcon id={task.typeId}></TaskTypeIcon>
        </p>
    </Card>
}
export const KanbanColumn = React.forwardRef<HTMLDivElement,{kanban:kanban}>(({kanban,...props},ref) => {
    const {data:allTasks}=useTasks(useTasksSearchParams())
    const tasks=allTasks?.filter(task=>task.kanbanId===kanban.id)
    return (
        <Container ref={ref} {...props}>
            <Row between={true}>
                <h3>{kanban.name}</h3>
                <More kanban={kanban} key={kanban.id}></More>
            </Row>
            <TasksContainer>
                <Drop type="ROW" direction="vertical" droppableId={kanban.id.toString()}>
                    <DropChild style={{minHeight:'5px'}}>
                    {
                        tasks?.map((task,index)=><Drag key={task.id} index={index} draggableId={'task'+task.id}>
                            <div ref={ref}>
                                <TaskCard task={task} key={task.id}></TaskCard>
                            </div>
                        </Drag>)
                    }
                    </DropChild>
                </Drop>
                <CreateTask kanbanId={kanban.id}></CreateTask>
            </TasksContainer>
        </Container>
    )
})
const More = ({kanban}:{kanban:kanban}) => {
    const {mutateAsync}=useDeleteKanban(useKanbansQueryKey())
    const startEdit=()=>{
        Modal.confirm({
            okText:'确定',
            cancelText:'取消',
            title:'确定删除看板吗?',
            onOk() {
                return mutateAsync({id:kanban.id})
            }
        })
    }
    const overlay=<Menu>
        <Menu.Item>
            <Button type="link" onClick={startEdit}>删除</Button>
        </Menu.Item>
    </Menu>
    return <Dropdown overlay={overlay}>
        <Button type="link">...</Button>
    </Dropdown>
}
export const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244,245,247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 1rem;
    margin-right: 1.5rem;
`
const TasksContainer = styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar {
        display: none;
    }
`
