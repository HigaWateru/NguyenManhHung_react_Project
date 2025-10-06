import { type IProject, type IUser } from "@/utils/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export const fetchData = createAsyncThunk<IUser[]>('auth/fetchData', async () => {
    const response = await axios.get<IUser[]>('http://localhost:3000/users')
    return response.data
})

export const login = createAsyncThunk<IUser, LoginPayload, { rejectValue: {email: string, password: string} }>("auth/login", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get<IUser[]>("http://localhost:3000/users")
        const foundUser = response.data.find((user) => user.email === payload.email)
        if (!foundUser) return rejectWithValue({email: "Email không tồn tại", password: ''})
        if (foundUser.password !== payload.password) return rejectWithValue({email: '', password: 'Mật khẩu không đúng'})
        localStorage.setItem("currentUser", foundUser.id)
        return foundUser
    } catch {
        return rejectWithValue({email: '', password: 'Lỗi server'})
    }
})
export const register = createAsyncThunk<IUser, RegisterPayload, { rejectValue: {email: string, password: string} }>("auth/register", async(payload, { rejectWithValue }) => {
    try {
        const response = await axios.get<IUser[]>("http://localhost:3000/users")
        const exists = response.data.find((user) => user.email === payload.email)
        if (exists) return rejectWithValue({email: "Email đã tồn tại", password: ''})

        const newUser: IUser = {
            id: String(Date.now()),
            username: payload.name,
            email: payload.email,
            password: payload.password,
            projects: [],
      }
        await axios.post("http://localhost:3000/users", newUser)
        localStorage.setItem("currentUser", newUser.id)
        return newUser
    } catch {
        return rejectWithValue({email: '', password: 'Lỗi server'})
    }
})

export const fetchProject = createAsyncThunk<{data: IProject[], total: number}, {page: number, limit: number, search: string}>('auth/fetchProject', async ({page, limit, search}) => {
    const userID = localStorage.getItem('currentUser')
    if (!userID) return {data: [], total: 0}
    const response = await axios.get<IUser>(`http://localhost:3000/users/${userID}`)
    const projectData = response.data.projects

    const filtered = projectData.filter(project => project.name.toLowerCase().includes(search.toLowerCase()))

    const start = (page - 1) * limit
    const end = start + limit
    const paginatedProject = filtered.slice(start, end)
    return {data: paginatedProject, total: filtered.length}
})

export const addProject = createAsyncThunk<IProject, { name: string; image: string; description: string }, { rejectValue: string }>("project/add", async(payload, { rejectWithValue }) => {
    try {
        const userID = localStorage.getItem("currentUser")
        if (!userID) return rejectWithValue("Không tìm thấy người dùng hiện tại")
        const { data: userData } = await axios.get<IUser>(`http://localhost:3000/users/${userID}`)
        const exitst = userData.projects.some(project => project.name.toLowerCase().trim() === payload.name.toLowerCase())
        if(exitst) rejectWithValue('Tên dự án đã tồn tại')
        const newProject: IProject = {
            id: Date.now(),
            name: payload.name,
            image: payload.image,
            description: payload.description,
            todos: [],
            members: [],
        }
        const updatedUser: IUser = {...userData, projects: [...userData.projects, newProject]}
        await axios.put(`http://localhost:3000/users/${userID}`, updatedUser)
        return newProject
    } catch {
        return rejectWithValue("Lỗi khi thêm dự án")
    }
})

export const fetchTodo = createAsyncThunk<IProject, number>('auth/fetchTodo', async (projectId) => {
    const userID = localStorage.getItem('currentUser')
    if (!userID) throw new Error('No current user')
    const response = await axios.get<IUser>(`http://localhost:3000/users/${userID}`)
    const project = response.data.projects.find(project => project.id === projectId)
    if (!project) throw new Error('Project not found')
    return project
})