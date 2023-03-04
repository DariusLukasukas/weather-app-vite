import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  geolocation: { lat: 54.687157, lng: 25.279652 },
};

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    saveGeoCode: (state, action) => {
      return { ...state, geolocation: action.payload };
    },
  },
});

export const { saveGeoCode } = geolocationSlice.actions;
export default geolocationSlice;
