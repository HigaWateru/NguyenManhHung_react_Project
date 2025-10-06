import { createSlice } from "@reduxjs/toolkit";
import { addProject, deleteProject, fetchProject } from "@/apis/auth.api";
import type { IProject } from "@/utils/types";

interface ProjectState {
    list: IProject[]
    total: number
    loading: boolean
    error: {name: string, description: string} | null
}

const initialState: ProjectState = {
    list: [],
    total: 0,
    loading: false,
    error: null
}

const projectSlice = createSlice({
    name: "projectList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProject.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchProject.fulfilled, (state, action) => {
            state.list = action.payload.data
            state.total = action.payload.total
            state.loading = false
        })
        .addCase(fetchProject.rejected, (state) => {
            state.loading = false
        })

        .addCase(addProject.pending, state => {
            state.error = null
        })
        .addCase(addProject.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
        .addCase(addProject.rejected, (state, action) => {
            state.error = action.payload || {name: '', description: ''}
        })

        .addCase(deleteProject.fulfilled, (state, action) => {
            state.list = state.list.filter(project => project.id !== action.payload)
            state.total -= 1
        })
        .addCase(deleteProject.rejected, (state, action) => {
            console.error("Xóa thất bại:", action.payload)
        })
    }
})

export default projectSlice.reducer
