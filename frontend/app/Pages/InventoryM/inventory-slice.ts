import { createSlice } from '@reduxjs/toolkit';

const setInventoriesSlice = createSlice({
  name: 'inventories',
  initialState: {
    inventories: {},
    existingInventory: false,
    editInventory: false,
    editingInventoryId: '',
    editingInventory: null
  },
  reducers: {
    setInventories: (state, action: any) => {
      state.inventories = action.payload;
    },
    setExistingInventory: (state, action: any) => {
      state.existingInventory = action.payload;
    },
    setEditInventory: (state, action: any) => {
      state.editInventory = action.payload;
    },
    setEditingInventoryId: (state, action: any) => {
      state.editingInventoryId = action.payload;
    },
    setEditingInventory: (state, action: any) => {
      state.editingInventory = action.payload;
    }
  }
});

export const { setInventories } = setInventoriesSlice.actions;
export const { setExistingInventory } = setInventoriesSlice.actions;
export const { setEditInventory } = setInventoriesSlice.actions;
export const { setEditingInventoryId } = setInventoriesSlice.actions;
export const { setEditingInventory } = setInventoriesSlice.actions;

export default setInventoriesSlice.reducer;
