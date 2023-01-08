import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { useProject } from "utils/project"
import { useUsers } from "utils/user"
import { Typography } from "antd"
import { useProjectSearchParams } from "./util"
import { Row } from "components/lib"
export const ProjectListScreen = (props:{projectButton:JSX.Element}) => {
    const [param,setParam] = useProjectSearchParams()
    const {isLoading,error,data:list,retry} = useProject(useDebounce(param,200))
    const {data:users} = useUsers()
    useDocumentTitle('项目列表',false)
    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                {props.projectButton}
            </Row>
            <SearchPanel param={param} setParam={setParam} users={users||[]}></SearchPanel>
            {error?<Typography.Text type="danger">{error.message}</Typography.Text>:null}
            <List projectButton={props.projectButton} refresh={retry} loading={isLoading} dataSource={list||[]} users={users||[]}></List>
        </Container>
    )
}
ProjectListScreen.whyDidYouRender = false
const Container = styled.div`
    padding: 3.2rem;
`