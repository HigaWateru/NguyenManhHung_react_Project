export interface IMember {
    id: string
    username: string
    email: string
    role: string
}

export interface Todo {
    id: string
    title: string
    priority: 'low' | 'medium' | 'high'
    personChange: IMember
    startDate: string
    endDate: string
    progress: 'scheduled' | 'in-progress' | 'delayed'
    status: 'to-do' | 'in-progress' | 'pending' | 'done'
}

export interface IProject {
    id: number
    name: string
    image: string
    description: string
    todos: Todo[]
    members: IMember[]
}

export interface IUser {
    id: string
    username: string
    email: string
    password: string
    projects: IProject[]
}