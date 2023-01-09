import styled from "@emotion/styled"
import { Spin } from "antd"
import { ScreenContainer } from "components/lib"
import { useDocumentTitle } from "utils"
import { useKanbans } from "utils/kanban"
import { useTasks } from "utils/task"
import { CreateKanban } from "./craete-kanban"
import { KanbanColumn } from "./kanban-column"
import { SearchPanel } from "./search-pannel"
import { TaskModal } from "./task-modal"
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from "./util"

export const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const {data:currentProject}=useProjectInUrl()
    const {data:kanbans,isLoading:kanbanIsLoading}=useKanbans(useKanbanSearchParams())
    const {isLoading:taskIsLoading} = useTasks(useTasksSearchParams())
    const loading = kanbanIsLoading||taskIsLoading
    return (
        <ScreenContainer>
            <h1>{currentProject?.name}看板</h1>
            <SearchPanel></SearchPanel>
            {
                loading?<Spin size="large"></Spin>:<ColumnsContainer>
                {
                    kanbans?.map(kanban=><KanbanColumn kanban={kanban} key={kanban.id}></KanbanColumn>)
                }
                    <CreateKanban></CreateKanban>
                </ColumnsContainer>
            }
            <TaskModal></TaskModal>
        </ScreenContainer>
    )
}
export const ColumnsContainer = styled.div`
    display: flex;
    flex: 1;
    overflow-x: scroll;
`