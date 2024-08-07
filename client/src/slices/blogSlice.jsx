import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlogServices from "../services/blogs";

const initialState = {
  blogs: [],
  blog: {},
  total: 0,
  currentPage: 1,
  limit: 90,
  error: "",
  loading: false,
};

export const listBlogs = createAsyncThunk(
  "blogs/listBlogs",
  async ({ limit, page }) => {
    const res = await BlogServices.list(limit, page);
    return res.data;
  }
);
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (payload) => {
    const res = await BlogServices.create(payload);
    return res.data;
  }
);

export const changeStatus = createAsyncThunk(
  "blog/changeStatus",
  async (slug) => {
    const res = await BlogServices.changeStatus(slug);
    return res.data;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.blogs = action.payload.data.data;
      })
      .addCase(listBlogs.pending, (state) => {
        state.loading = true;
        state.blogs = [];
        state.total = 0;
      })
      .addCase(listBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setLimit } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
