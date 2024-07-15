import { configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage
import autoMegerLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { bookmarkReducer } from "../slices/bookmarkSlice";
import { blogReducer } from "../slices/blogSlice";
import { authReducer } from "../slices/authSlice";

const persistConfig = {
  key: "blog-bookmark",
  storage, // LS
  version: 1,
  stateReconciler: autoMegerLevel2,
};
const authPersist = {
  key: "blog-profile",
  storage, // LS
  version: 1,
  stateReconciler: autoMegerLevel2,
};

const persistBookmark = persistReducer(persistConfig, bookmarkReducer);
const persistAuth = persistReducer(authPersist, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuth,
    bookmark: persistBookmark,
    blogs: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }),
  devTools: true,
});

export const newStore = persistStore(store);
