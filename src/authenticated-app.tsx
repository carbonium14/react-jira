import styled from "@emotion/styled"
import { ButtonNoPadding, Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"
import { useState } from "react"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "components/project-popover"
export const AuthenticatedApp = () => {
    const [projectModalOpen,setProjectModalOpen] = useState(false)
    return (
        <Container>
            <PageHeader projectButton={<ButtonNoPadding type="link" onClick={()=>setProjectModalOpen(true)}>创建项目</ButtonNoPadding>}></PageHeader>
            <Main>
                <Router>
                    <Routes>
                        <Route path="/projects" 
                        element={<ProjectListScreen projectButton={<ButtonNoPadding type="link" onClick={()=>setProjectModalOpen(true)}>创建项目</ButtonNoPadding>}></ProjectListScreen>}></Route>
                        <Route path="/projects/:projectId/*" element={<ProjectScreen></ProjectScreen>}></Route>
                        <Navigate to={'/projects'}></Navigate>
                    </Routes>
                </Router>
            </Main>
            <ProjectModal projectModalOpen={projectModalOpen} onClose={()=>setProjectModalOpen(false)}></ProjectModal>
        </Container>
    )
}
const PageHeader = (props:{projectButton:JSX.Element}) => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type="link" onClick={resetRoute}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}></SoftwareLogo>
                </ButtonNoPadding>
                <ProjectPopover {...props}></ProjectPopover>
                <span>用户</span>
            </HeaderLeft>
            <HeaderRight>
                <User></User>
            </HeaderRight>
        </Header>
    )
}
const User = () => {
    const {logout,user} = useAuth()
    return (
        <Dropdown overlay={<Menu>
            <Menu.Item key={'logout'}>
                <Button type="link" onClick={logout}>登出</Button>
            </Menu.Item>
        </Menu>}>
            <Button type="link" onClick={e=>e.preventDefault()}>
                Hi, {user?.name}
            </Button>
        </Dropdown>
    )
}
const Container =styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    grid-template-columns: 20rem 1fr 20rem;
    grid-gap: 10rem;
`
const Header = styled(Row)`
    grid-area: "header";
`
const HeaderLeft = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    z-index: 1;
`
const HeaderRight = styled.div``
const Main = styled.main`
    grid-area: "main";
`