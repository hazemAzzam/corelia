import { configureStore, combineReducers, type Middleware, type UnknownAction } from "@reduxjs/toolkit"
import authReducer from "../features/authentication/state/authSlice"
import contactsReducer from "../features/contacts/state/contactsSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const persistenceMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action)
  const state = store.getState()
  const unknownAction = action as UnknownAction

  if (unknownAction.type.startsWith("contacts/")) {
    localStorage.setItem("contacts", JSON.stringify(state.contacts.contacts))
  }

  if (unknownAction.type.startsWith("auth/")) {
    localStorage.setItem("users", JSON.stringify(state.auth.users))
    localStorage.setItem("rememberedUser", JSON.stringify(state.auth.rememberedUser))
  }

  return result
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(persistenceMiddleware),
})

export type AppDispatch = typeof store.dispatch
