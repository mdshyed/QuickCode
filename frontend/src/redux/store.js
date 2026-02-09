import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import workspaceReducer from './workspaceSlice'

const rootReducer = combineReducers({
    user: userReducer,
    workspace: workspaceReducer
})

export const store = configureStore({
    reducer: rootReducer
})