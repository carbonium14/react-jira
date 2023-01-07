/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd"
export interface User {
    id: string,
    name: string,
    email: string,
    title: string,
    organization: string,
    token: string
}
interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param:SearchPanelProps['param']) => void
}
export const SearchPanel = ({users, param, setParam}:SearchPanelProps) => {
    return (
        <Form layout={'inline'} css={{marginBottom:'2rem'}}>
            <Form.Item>
                <Input placeholder="项目名" type="text" value={param.name} onChange={evt=>setParam({
                    ...param,
                    name: evt.target.value
                })}/>
            </Form.Item>
            <Form.Item>
                <Select value={param.personId} onChange={value=>setParam({
                    ...param,
                    personId: value
                })}>
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map((user)=><Select.Option value={user.id.toString()} key={user.id}>{user.name}</Select.Option>)
                }
                </Select>
            </Form.Item>
        </Form>
    )
}