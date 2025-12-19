import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserWithRememberMe } from "../../../types/User";
import { ERRORS_CODE } from "../errors";
import { toast } from "sonner";


interface AuthState {
    users: User[];
    activeUser: User | null;
    rememberedUser: User | null;
    isError: boolean | null;
    error: string | null;
}

const initialState: AuthState = {
    users: localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users") || "") : [],
    rememberedUser: localStorage.getItem("rememberedUser") ? JSON.parse(localStorage.getItem("rememberedUser") || "") : null,
    activeUser: localStorage.getItem("rememberedUser") ? JSON.parse(localStorage.getItem("rememberedUser") || "") : null,
    isError: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserWithRememberMe>) => {
            const user = state.users.find((u) => u.email === action.payload.email && u.password === action.payload.password);
            if (user) {
                state.activeUser = user;
                if (action.payload.rememberMe)
                    state.rememberedUser = user;
            } else {
                state.isError = true;
                state.error = ERRORS_CODE.USER_NOT_FOUND;
                toast.error(ERRORS_CODE.USER_NOT_FOUND);
            }
        },
        signup: (state, action: PayloadAction<User>) => {
            /* Check Email Existance */

            const user = state.users.find((u) => u.email === action.payload.email);
            if (user) {
                state.isError = true;
                state.error = ERRORS_CODE.USER_ALREADY_EXISTS;
                toast.error(ERRORS_CODE.USER_ALREADY_EXISTS);
                return;
            }

            /* Update Users State */
            state.users.push(action.payload);
            state.activeUser = action.payload;
        },
        logout: (state) => {
            state.activeUser = null;
            state.rememberedUser = null;
        },
    },
});

export const {
    login,
    signup,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
