import { Card, Input } from "antd"
import { useEffect, useState } from "react"
import { useAddTask } from "utils/task"
import { useProjectIdInUrl, useTasksQueryKey } from "./util"

export const CreateTask = ({kanbanId}:{kanbanId:number}) => {
    const [name,setName]=useState('')
    const {mutateAsync:addTask}=useAddTask(useTasksQueryKey())
    const projectId=useProjectIdInUrl().id
    const [inputMode,setInpueMode]=useState(false)
    const submit =async()=>{
        await addTask({projectId,name,kanbanId})
        setInpueMode(false)
        setName('')
    }
    const toggle=()=>setInpueMode(!inputMode)
    useEffect(()=>{
        if(!inputMode) {
            setName('')
        }
    },[inputMode])
    if(!inputMode) {
        return <div onClick={toggle}>+创建事物</div>
    }
    return <Card>
        <Input onBlur={toggle} placeholder='需要做些什么' autoFocus={true} onPressEnter={submit} value={name} onChange={e=>setName(e.target.value)}></Input>
    </Card>
}