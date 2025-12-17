import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import contactsReducer from "./contacts/contactsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

