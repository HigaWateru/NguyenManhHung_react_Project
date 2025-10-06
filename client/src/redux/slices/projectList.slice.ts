import { createSlice } from "@reduxjs/toolkit";
import { fetchProject } from "@/apis/auth.api";
import type { IProject } from "@/utils/types";

interface ProjectState {
    list: IProject[]
    total: number
    loading: boolean
}

const initialState: ProjectState = {
    list: [],
    total: 0,
    loading: false,
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
    },
})

export default projectSlice.reducer
