import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  lastVisitedProject: string | null;
}

const initialState: NavigationState = {
  lastVisitedProject: null,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setLastVisitedProject: (state, action: PayloadAction<string>) => {
      state.lastVisitedProject = action.payload;
    },
    clearLastVisitedProject: (state) => {
      state.lastVisitedProject = null;
    },
  },
});

export const { setLastVisitedProject, clearLastVisitedProject } = navigationSlice.actions;
export default navigationSlice.reducer;
