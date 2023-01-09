/* @jsxImportSource @emotion/react */
import { Form, Input} from "antd"
import { UserSelect } from "components/user-select"
import { Project } from "types/project"
import { User } from "types/user"

interface SearchPanelProps {
    users: User[],
    param: Partial<Pick<Project,'name'|'personId'>>,
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
                <UserSelect value={param.personId} defaultOptionName={'负责人'} onChange={value=>setParam({
                    ...param,
                    personId: value
                })}></UserSelect>
            </Form.Item>
        </Form>
    )
}