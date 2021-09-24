import { createSlice } from '@reduxjs/toolkit';

const setUsersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    existingUser: false,
    editUser: false,
    editingUserId: '',
    editingUser: null,
    login: false,
    userType: '',
    userName: ''
  },
  reducers: {
    setUsers: (state, action: any) => {
      state.users = action.payload;
    },
    setExistingUser: (state, action: any) => {
      state.existingUser = action.payload;
    },
    setEditUser: (state, action: any) => {
      state.editUser = action.payload;
    },
    setEditingUserId: (state, action: any) => {
      state.editingUserId = action.payload;
    },
    setEditingUser: (state, action: any) => {
      state.editingUser = action.payload;
    },
    setLogin: (state, action: any) => {
      state.login = action.payload;
    },
    setUserType: (state, action: any) => {
      state.userType = action.payload;
    },
    setUserName: (state, action: any) => {
      state.userName = action.payload;
    }
  }
});

export const { setUsers } = setUsersSlice.actions;
export const { setExistingUser } = setUsersSlice.actions;
export const { setEditUser } = setUsersSlice.actions;
export const { setEditingUserId } = setUsersSlice.actions;
export const { setEditingUser } = setUsersSlice.actions;
export const { setLogin } = setUsersSlice.actions;
export const { setUserType } = setUsersSlice.actions;
export const { setUserName } = setUsersSlice.actions;

export default setUsersSlice.reducer;
