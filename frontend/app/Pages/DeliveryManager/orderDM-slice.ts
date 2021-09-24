import { createSlice } from '@reduxjs/toolkit';

const setOrderDMSlice = createSlice({
  name: 'orderDM',
  initialState: {
    orderDM: null,
    existingOrderDM: false,
    editOrderDM: false,
    editingOrderDMId: '',
    editingOrderDM: null
  },
  reducers: {
    setOrderDM: (state, action: any) => {
      state.orderDM = action.payload;
    },
    setExistingOrderDM: (state, action: any) => {
      state.existingOrderDM = action.payload;
    },
    setEditOrderDM: (state, action: any) => {
      state.editOrderDM = action.payload;
    },
    setEditingOrderDMId: (state, action: any) => {
      state.editingOrderDMId = action.payload;
    },
    setEditingOrderDM: (state, action: any) => {
      state.editingOrderDM = action.payload;
    }
  }
});

export const { setOrderDM } = setOrderDMSlice.actions;
export const { setExistingOrderDM } = setOrderDMSlice.actions;
export const { setEditOrderDM } = setOrderDMSlice.actions;
export const { setEditingOrderDMId } = setOrderDMSlice.actions;
export const { setEditingOrderDM } = setOrderDMSlice.actions;

export default setOrderDMSlice.reducer;
