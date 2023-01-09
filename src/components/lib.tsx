import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
const isError = (value:any):value is Error => value?.message
export const ErrorBox = ({error}:{error:unknown}) => {
    if (isError(error)) {
        return <Typography.Text type="danger">{error?.message}</Typography.Text>
    }
    return null
}
export const ButtonNoPadding = styled(Button)`
    padding: 0;
`
const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const FullPageLoading = () => {
    return (
        <FullPage>
            <Spin size="large"></Spin>
        </FullPage>
    )
}
export const FullPageErrorFallBack = ({error}:{error:Error|null}) => {
    return (
        <FullPage>
            <ErrorBox error={error}></ErrorBox>
        </FullPage>
    )
}
export const Row = styled.div<{
    gap?: number|boolean,
    between?: boolean,
    marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props=>props.between===true?'space-between':undefined};
    margin-bottom: ${props=>props.marginBottom+'rem'};
    > * {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props=>typeof props.gap === 'number'?props.gap+'rem':props.gap?'2rem':undefined};
    }
`
