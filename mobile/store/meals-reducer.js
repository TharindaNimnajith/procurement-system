import { TOGGLE_FAVORITE, SET_FILTERS } from "./actions";

const initialState = {
  favoriteMeals: [],
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      return state;
    default:
      return state;
  }
};

export default shopReducer;
