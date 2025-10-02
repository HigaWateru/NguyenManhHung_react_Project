import { type IProject, type IUser } from "@/utils/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk<IUser[]>('auth/fetchData', async () => {
    const response = await axios.get<IUser[]>('http://localhost:3000/users')
    return response.data
})

export const fetchProject = createAsyncThunk<IProject[]>('auth/fetchProject', async () => {
    const userId = localStorage.getItem('currentUser')
    if (!userId) return []
    const response = await axios.get<IUser>(`http://localhost:3000/users/${userId}`)
    return response.data.projects
})

export const fetchTodo = createAsyncThunk<IProject, number>('auth/fetchTodo', async (projectId) => {
    const userId = localStorage.getItem('currentUser')
    if (!userId) throw new Error('No current user')
    const response = await axios.get<IUser>(`http://localhost:3000/users/${userId}`)
    const project = response.data.projects.find(project => project.id === projectId)
    if (!project) throw new Error('Project not found')
    return project
})