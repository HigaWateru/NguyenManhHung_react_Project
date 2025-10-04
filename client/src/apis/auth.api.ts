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

export const login = createAsyncThunk<IUser, LoginPayload, { rejectValue: string }>("auth/login", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get<IUser[]>("http://localhost:3000/users")
        const foundUser = response.data.find((user) => user.email === payload.email)
        if (!foundUser) return rejectWithValue("Email không tồn tại");
        if (foundUser.password !== payload.password) return rejectWithValue("Mật khẩu không đúng")
        localStorage.setItem("currentUser", foundUser.id)
        return foundUser
    } catch {
        return rejectWithValue("Lỗi server")
    }
})
export const register = createAsyncThunk<IUser, RegisterPayload, { rejectValue: string }>("auth/register",async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get<IUser[]>("http://localhost:3000/users")
        const exists = response.data.find((user) => user.email === payload.email)
        if (exists) return rejectWithValue("Email đã tồn tại")

        const newUser: IUser = {
            id: String(Date.now()),
            username: payload.name,
            email: payload.email,
            password: payload.password,
            projects: [],
      }
        await axios.post("http://localhost:3000/users", newUser)
        localStorage.setItem("currentUser", newUser.id)

        return newUser;
    } catch {
        return rejectWithValue("Lỗi server")
    }
})

export const fetchProject = createAsyncThunk<IProject[]>('auth/fetchProject', async () => {
    const userID = localStorage.getItem('currentUser')
    if (!userID) return []
    const response = await axios.get<IUser>(`http://localhost:3000/users/${userID}`)
    return response.data.projects
})

export const fetchTodo = createAsyncThunk<IProject, number>('auth/fetchTodo', async (projectId) => {
    const userID = localStorage.getItem('currentUser')
    if (!userID) throw new Error('No current user')
    const response = await axios.get<IUser>(`http://localhost:3000/users/${userID}`)
    const project = response.data.projects.find(project => project.id === projectId)
    if (!project) throw new Error('Project not found')
    return project
})