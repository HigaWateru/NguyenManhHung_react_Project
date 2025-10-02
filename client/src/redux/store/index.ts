import {configureStore} from '@reduxjs/toolkit'
import projectDetailSlice from '../slices/projectDetail.slice'
import projectListSlice from '../slices/projectList.slice'
export const store = configureStore({
    reducer: {
        projectList: projectListSlice,
        projectDetail: projectDetailSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch