import styled from "@emotion/styled"
import { Divider, List, Popover, Typography } from "antd"
import { useProjectModal } from "screens/project-list/util"
import { useProject } from "utils/project"
import { ButtonNoPadding } from "./lib"

export const ProjectPopover = () => {
    const {open}=useProjectModal()
    const {data:projects,refetch} = useProject()
    const pinnedProjects = projects?.filter(project=>project.pin)
    const Content = <ContentContainer>
        <Typography.Text type="secondary">收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map((project)=><List.Item>
                    <List.Item.Meta title={project.name}></List.Item.Meta>
                </List.Item>)
            }
        </List>
        <Divider></Divider>
        <ButtonNoPadding type="link" onClick={open}></ButtonNoPadding>
    </ContentContainer>
    return (
        <Popover onVisibleChange={()=>refetch()} placement="bottom" content={Content}>
            <span>项目</span>
        </Popover>
    )
}
const ContentContainer = styled.div`
    min-width: 30rem;
`