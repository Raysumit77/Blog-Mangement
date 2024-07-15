import { useState, useCallback } from "react";
import instance from "../utils/api";
import { URLS } from "../constants";

export const useBlogs = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const getPublishedBlogs = useCallback(
    async ({ title = "", page = 1, limit = 10 }) => {
      try {
        setLoading(true);
        console.log("URLS", URLS);
        const res = await instance.get(
          URLS.GETPUBLISHEDBLOGS + `?title=${title}&page=${page}&limit=${limit}`
        );
        setData(res.data.data);
        return res.data.data;
      } catch (e) {
        const errMsg = e.response.data.msg || "Something went wrong";
        setError(errMsg);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setError("");
          setMsg("");
        }, 3000);
      }
    },
    []
  );

  const getOneBlog = useCallback(async (slug) => {
    try {
      setLoading(true);
      const res = await instance.get(URLS.GET_ONE_BLOG + "/" + slug);
      return res.data.data;
    } catch (e) {
      const errMsg = e.response.data.msg || "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
        setMsg("");
      }, 3000);
    }
  }, []);

  return { getOneBlog, getPublishedBlogs, data, error, msg, loading };
};
