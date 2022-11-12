import * as auth from "auth-provider";
import { createSlice } from "@reduxjs/toolkit";
import { AuthFrom, bootstrapUser } from "context/auth-context";
import { User } from "screens/project-list/search-panel";
import { AppDispatch, RootState } from "store";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, actions) {
      state.user = actions.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthFrom) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));

export const register = (form: AuthFrom) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then((user) => dispatch(setUser(user)));

export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));
