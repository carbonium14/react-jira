import styled from "@emotion/styled"
import { Spin } from "antd"
import { Drag, Drop, DropChild } from "components/drag-and-drop"
import { ScreenContainer } from "components/lib"
import { Profiler } from "components/profiler"
import { useCallback } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useDocumentTitle } from "utils"
import { useKanbans, useReorderKanban } from "utils/kanban"
import { useReorderTask, useTasks } from "utils/task"
import { CreateKanban } from "./craete-kanban"
import { KanbanColumn } from "./kanban-column"
import { SearchPanel } from "./search-pannel"
import { TaskModal } from "./task-modal"
import { useKanbanSearchParams, useKanbansQueryKey, useProjectInUrl, useTasksQueryKey, useTasksSearchParams } from "./util"

export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const {data:currentProject}=useProjectInUrl()
    const {data:kanbans,isLoading:kanbanIsLoading}=useKanbans(useKanbanSearchParams())
    const {isLoading:taskIsLoading} = useTasks(useTasksSearchParams())
    const loading = kanbanIsLoading||taskIsLoading
    const onDragEnd = useDragEnd()
    return (
        <Profiler id="看板页面">
            <DragDropContext onDragEnd={onDragEnd}>
                <ScreenContainer>
                    <h1>{currentProject?.name}看板</h1>
                    <SearchPanel></SearchPanel>
                    {
                        loading?<Spin size="large"></Spin>:
                        <ColumnsContainer>
                            <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
                                <DropChild style={{display:'flex'}}>
                                {
                                    kanbans?.map((kanban,index)=><Drag key={kanban.id} draggableId={'kanban'+kanban.id} index={index}>
                                        <KanbanColumn kanban={kanban} key={kanban.id}></KanbanColumn>
                                    </Drag>)
                                }
                                </DropChild>
                            <CreateKanban></CreateKanban>
                            </Drop>
                        </ColumnsContainer>
                    }
                    <TaskModal></TaskModal>
                </ScreenContainer>
            </DragDropContext>
        </Profiler>
    )
}
export const useDragEnd = () => {
    const {data:kanbans}=useKanbans(useKanbanSearchParams())
    const {mutate:reorderKanban}=useReorderKanban(useKanbansQueryKey())
    const {data:allTasks=[]}=useTasks(useTasksSearchParams())
    const {mutate:reorderTask}=useReorderTask(useTasksQueryKey())
    return useCallback(({source,destination,type}:DropResult) => {
        if(!destination) {
            return
        }
        if(type==='COLUMN') {
            const fromId=kanbans?.[source.index].id
            const toId=kanbans?.[destination.index].id
            if(!fromId||!toId||fromId===toId) {
                return
            }
            const type=destination.index>source.index?'after':'before'
            reorderKanban({fromId,referenceId:toId,type})
        }
        if(type==='Row') {
            const fromKanbanId=+source.droppableId
            const toKanbanId=+destination.droppableId
            if(fromKanbanId===toKanbanId) {
                return
            }
            const fromTask=allTasks.filter(task=>task.kanbanId===fromKanbanId)[source.index]
            const toTask=allTasks.filter(task=>task.kanbanId===toKanbanId)[destination.index]
            if(fromTask.id===toTask.id) {
                return
            }
            reorderTask({
                fromId:fromTask?.id,
                referenceId:toTask?.id,
                fromKanbanId,
                toKanbanId,
                type:fromKanbanId===toKanbanId&&destination.index>source.index?'after':'before'
            })
        }
    },[allTasks, kanbans, reorderKanban, reorderTask])
}
export const ColumnsContainer = styled.div`
    display: flex;
    flex: 1;
    overflow-x: scroll;
`