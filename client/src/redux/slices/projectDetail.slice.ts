import { fetchTodo } from "@/apis/auth.api"
import type { IProject } from "@/utils/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface State {
    project: IProject | null
    loading: boolean
}

const initialState: State = {
    project: null,
    loading: false
}

const projectDetailSlice = createSlice({
    name: 'projectDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTodo.fulfilled, (state, action: PayloadAction<IProject>) => {
                state.project = action.payload
                state.loading = false
            })
            .addCase(fetchTodo.rejected, (state) => {
                state.loading = false
            })
    }
})
export default projectDetailSlice.reducer