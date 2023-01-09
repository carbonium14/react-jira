import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { useProject } from "utils/project"
import { useUsers } from "utils/user"
import { useProjectModal, useProjectSearchParams } from "./util"
import { ButtonNoPadding, ErrorBox, Row } from "components/lib"
export const ProjectListScreen = () => {
    const [param,setParam] = useProjectSearchParams()
    const {isLoading,error,data:list} = useProject(useDebounce(param,200))
    const {data:users} = useUsers()
    const {open}=useProjectModal()
    useDocumentTitle('项目列表',false)
    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding type="link" onClick={open}></ButtonNoPadding>
            </Row>
            <SearchPanel param={param} setParam={setParam} users={users||[]}></SearchPanel>
            <ErrorBox error={error}></ErrorBox>
            <List loading={isLoading} dataSource={list||[]} users={users||[]}></List>
        </Container>
    )
}
ProjectListScreen.whyDidYouRender = false
const Container = styled.div`
    padding: 3.2rem;
`