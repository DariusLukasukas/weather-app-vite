import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  location: "Vilnius, Lithuania",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchValue: (state, action) => {
      return { ...state, searchValue: action.payload };
    },
    saveLocation: (state, action) => {
      return { ...state, location: action.payload };
    },
  },
});

export const { updateSearchValue, clearnInputValue, saveLocation } =
  searchSlice.actions;
export default searchSlice;
