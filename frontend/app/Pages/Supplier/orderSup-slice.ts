import { createSlice } from '@reduxjs/toolkit';

const setOrderSupSlice = createSlice({
  name: 'orderSup',
  initialState: {
    orderSup: null,
    existingOrderSup: false,
    editOrderSup: false,
    editingOrderSupId: '',
    editingOrderSup: null
  },
  reducers: {
    setOrderSup: (state, action: any) => {
      state.orderSup = action.payload;
    },
    setExistingOrderSup: (state, action: any) => {
      state.existingOrderSup = action.payload;
    },
    setEditOrderSup: (state, action: any) => {
      state.editOrderSup = action.payload;
    },
    setEditingOrderSupId: (state, action: any) => {
      state.editingOrderSupId = action.payload;
    },
    setEditingOrderSup: (state, action: any) => {
      state.editingOrderSup = action.payload;
    }
  }
});

export const { setOrderSup } = setOrderSupSlice.actions;
export const { setExistingOrderSup } = setOrderSupSlice.actions;
export const { setEditOrderSup } = setOrderSupSlice.actions;
export const { setEditingOrderSupId } = setOrderSupSlice.actions;
export const { setEditingOrderSup } = setOrderSupSlice.actions;

export default setOrderSupSlice.reducer;
