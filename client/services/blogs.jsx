import instance from "../utils/api";

import { URLS } from "../constants";

const list = (limit, page) => {
  return instance.get(`${URLS.GET_ONE_BLOG}?page=${page}&limit=${limit}`, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

const create = (payload) => {
  return instance.post(URLS.GET_ONE_BLOG, payload, {
    headers: {
      access_token: localStorage.getItem("access_token"),
      "Content-Type": "multipart/form-data",
    },
  });
};

const BlogServices = {
  list,
  create,
};

export default BlogServices;
