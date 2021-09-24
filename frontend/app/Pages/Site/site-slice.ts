import { createSlice } from '@reduxjs/toolkit';

const setSitesSlice = createSlice({
  name: 'sites',
  initialState: {
    sites: {},
    existingSite: false,
    editSite: false,
    editingSiteId: '',
    editingSite: null
  },
  reducers: {
    setSites: (state, action: any) => {
      state.sites = action.payload;
    },
    setExistingSite: (state, action: any) => {
      state.existingSite = action.payload;
    },
    setEditSite: (state, action: any) => {
      state.editSite = action.payload;
    },
    setEditingSiteId: (state, action: any) => {
      state.editingSiteId = action.payload;
    },
    setEditingSite: (state, action: any) => {
      state.editingSite = action.payload;
    }
  }
});

export const { setSites } = setSitesSlice.actions;
export const { setExistingSite } = setSitesSlice.actions;
export const { setEditSite } = setSitesSlice.actions;
export const { setEditingSiteId } = setSitesSlice.actions;
export const { setEditingSite } = setSitesSlice.actions;

export default setSitesSlice.reducer;
