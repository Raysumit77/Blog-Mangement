import instance from "../utils/api";

import { URLS } from "../constants";

const create = (payload) => {
  return instance.post(URLS.GET_ONE_BLOG, payload, {
    headers: { 
      access_token: localStorage.getItem("access_token"),
      "Content-Type": "multipart/form-data",
      
    },
  });
};

const list = (limit, page) => {
  return instance.get(`${URLS.GET_ONE_BLOG}?page=${page}&limit=${limit}`, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

const getBySlug = (slug) => {
  return instance.get(URLS.GET_ONE_BLOG.concat("/", slug), {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

const removeBlog = (slug) => {
  return instance.delete(URLS.GET_ONE_BLOG.concat("/", slug), {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

const changeStatus = (slug) => {
  return instance.patch(
    URLS.GET_ONE_BLOG.concat("/", slug),
    {},
    {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    }
  );
};

const updateBlog = (slug, payload) => {
  return instance.put(URLS.GET_ONE_BLOG.concat("/", slug), payload, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

const BlogServices = {
  changeStatus,
  create,
  list,
  getBySlug,
  removeBlog,
  updateBlog,
};

export default BlogServices;
