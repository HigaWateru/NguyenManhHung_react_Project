import { addTodo, deleteTodo, fetchTodo, updateTodo } from "@/apis/auth.api"
import type { IProject, Todo } from "@/utils/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface State {
    project: IProject | null
    loading: boolean
    error: string
    todos: Todo[]
}

const initialState: State = {
    project: null,
    loading: false,
    error: '',
    todos: []
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
            state.todos = action.payload.todos
            state.loading = false
        })
        .addCase(fetchTodo.rejected, (state) => {
            state.loading = false
        })

        .addCase(addTodo.pending, (state) => {
            state.error = ''
            state.loading = true
        })
        .addCase(addTodo.fulfilled, (state, action) => {
            state.loading = false
            state.project = action.payload
            state.todos = action.payload.todos
        })
        .addCase(addTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Lỗi khi thêm nhiệm vụ'
        })

        .addCase(updateTodo.pending, (state) => {
            state.error = ''
            state.loading = true
        })
        .addCase(updateTodo.fulfilled, (state, action) => {
            state.loading = false
            state.project = action.payload
            state.todos = action.payload.todos
        })
        .addCase(updateTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Lỗi khi sửa nhiệm vụ'
        })

        .addCase(deleteTodo.pending, (state) => {
            state.error = ''
            state.loading = true
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.loading = false
            state.project = action.payload
            state.todos = action.payload.todos
        })
        .addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Lỗi khi xoá nhiệm vụ'
        })
    }

})
export default projectDetailSlice.reducer