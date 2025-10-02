import { fetchProject } from "@/apis/auth.api"
import type { IProject, } from "@/utils/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface State {
    list: IProject[]
    loading: boolean
    search: string
}
const initialState: State = {
    list: [],
    loading: false,
    search: ''
}

const projectListSlice = createSlice({
    name: 'projectList',
    initialState,
    reducers: { 
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProject.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProject.fulfilled, (state, action: PayloadAction<IProject[]>) => {
                state.list = action.payload
                state.loading = false
            })
            .addCase(fetchProject.rejected, (state) => {
                state.loading = false
            })
    }
})

export const { setSearch } = projectListSlice.actions
export default projectListSlice.reducer