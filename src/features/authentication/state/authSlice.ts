import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../types/User";

interface AuthState {
    user: User | null;
    isError: boolean | null;
    error: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user")!),
    isError: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            try {
                const users = localStorage.getItem("users")

                if (!users) throw new Error("No Users Found")

                const parsedUsers = JSON.parse(users!)
                const user = parsedUsers.find((user: User) => user.email === action.payload.email && user.password === action.payload.password)

                if (!user) throw new Error("Invalid Credentials")

                state.user = user

                if (action.payload.rememberMe)
                    localStorage.setItem("user", JSON.stringify(state.user))

            }
            catch (error: any) {
                state.isError = true
                state.error = error.message
            }
        },
        signup: (state, action: PayloadAction<User>) => {
            try {
                const users = localStorage.getItem("users") || "[]"

                const parsedUsers: User[] = JSON.parse(users)
                const user = parsedUsers.find((user: User) => user.email === action.payload.email)

                if (user) throw new Error("Email Already Exist")

                localStorage.setItem("users", JSON.stringify([...parsedUsers, action.payload]));

                state.user = action.payload;
            }
            catch (error: any) {
                state.isError = true;
                state.error = error.message
            }
        },
        logout: (state) => {
            state.user = null;
            state.isError = null;
            localStorage.removeItem("user")
        },
    },
});

export const {
    login,
    signup,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
