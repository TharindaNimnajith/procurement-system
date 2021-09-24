import { createSlice } from '@reduxjs/toolkit';

const setNewUsersSlice = createSlice({
  name: 'newUsers',
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

export const { setUsers } = setNewUsersSlice.actions;
export const { setExistingUser } = setNewUsersSlice.actions;
export const { setEditUser } = setNewUsersSlice.actions;
export const { setEditingUserId } = setNewUsersSlice.actions;
export const { setEditingUser } = setNewUsersSlice.actions;
export const { setLogin } = setNewUsersSlice.actions;
export const { setUserType } = setNewUsersSlice.actions;
export const { setUserName } = setNewUsersSlice.actions;

export default setNewUsersSlice.reducer;
