import { Route, Routes, Navigate } from "react-router"
import { Link } from "react-router-dom"
import { EpicScreen } from "screens/epic"
import { KanbanScreen } from "screens/kanban"

export const ProjectScreen = () => {
    return (
        <div>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path="/kanban" element={<KanbanScreen></KanbanScreen>}></Route>
                <Route path="/epic" element={<EpicScreen></EpicScreen>}></Route>
                <Navigate to={window.location.pathname+'/kanban'}></Navigate>
            </Routes>
        </div>
    )
}