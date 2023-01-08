import { Button, Drawer } from "antd"

export const ProjectModal = (props:{projectModalOpen:boolean,onClose:()=>void}) => {
    return (
        <Drawer onClose={props.onClose} width={'100%'} visible={props.projectModalOpen}>
            <Button onClick={props.onClose}>关闭</Button>
        </Drawer>
    )
}