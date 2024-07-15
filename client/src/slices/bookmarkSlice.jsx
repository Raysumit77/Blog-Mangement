import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
  quantity: 0,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      delete action.payload.content;
      const alreadyBookmarked = state.bookmarks.find(
        (item) => item.slug === action.payload.slug
      );
      if (!alreadyBookmarked) {
        state.bookmarks.push({ ...action.payload });
        state.quantity++;
      }
    },
    removeBookmark: (state, action) => {
      const existingItems = state.bookmarks.filter(
        (item) => item.slug !== action.payload
      );
      state.bookmarks = existingItems;
      state.quantity = existingItems.length;
    },
    removeAll: (state) => {
      state.bookmarks = [];
      state.quantity = 0;
    },
  },
});

// latest data
export const { addBookmark, removeBookmark, removeAll } = bookmarkSlice.actions;

// extract function
export const bookmarkReducer = bookmarkSlice.reducer;
