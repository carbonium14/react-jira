import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'
interface state {
    projectModalOpen: boolean,
}
const initialState:state = {
    projectModalOpen:false
}
export const ProjectListSlice=createSlice({
    name: 'ProjectListSlice',
    initialState,
    reducers:{
        openProjectModal(state) {
            state.projectModalOpen=true
        },
        closeProjectModal(state) {
            state.projectModalOpen=false
        }
    }
})
export const ProjectListActions=ProjectListSlice.actions
export const selectProjectModalOpen=(state:RootState)=>{
    return state.projectList.projectModalOpen
}