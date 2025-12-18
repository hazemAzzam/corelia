import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/state/authSlice";
import contactsReducer from "../features/contacts/state/contactsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

