import styled from "@emotion/styled"
import { Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"

export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <h2>logo</h2>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <button onClick={logout}>登出</button>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen></ProjectListScreen>
            </Main>
        </Container>
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
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`
    grid-area: "main";
`