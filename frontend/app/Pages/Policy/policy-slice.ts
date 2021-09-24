import { createSlice } from '@reduxjs/toolkit';

const setPoliciesSlice = createSlice({
  name: 'policies',
  initialState: {
    policies: {},
    existingPolicy: false,
    editPolicy: false,
    editingPolicyId: '',
    editingPolicy: null
  },
  reducers: {
    setPolicies: (state, action: any) => {
      state.policies = action.payload;
    },
    setExistingPolicy: (state, action: any) => {
      state.existingPolicy = action.payload;
    },
    setEditPolicy: (state, action: any) => {
      state.editPolicy = action.payload;
    },
    setEditingPolicyId: (state, action: any) => {
      state.editingPolicyId = action.payload;
    },
    setEditingPolicy: (state, action: any) => {
      state.editingPolicy = action.payload;
    }
  }
});

export const { setPolicies } = setPoliciesSlice.actions;
export const { setExistingPolicy } = setPoliciesSlice.actions;
export const { setEditPolicy } = setPoliciesSlice.actions;
export const { setEditingPolicyId } = setPoliciesSlice.actions;
export const { setEditingPolicy } = setPoliciesSlice.actions;

export default setPoliciesSlice.reducer;
