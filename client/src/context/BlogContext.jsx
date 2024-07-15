import { useEffect, useState, createContext, useContext } from "react";

import { useBlogs } from "../hooks/useBlogs";

const BlogContext = createContext(null);

export const BlogContextProvider = ({ children }) => {
  const { data: blogs, getPublishedBlogs, loading, error, msg } = useBlogs();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getPublishedBlogs({ title, page, limit });
  }, [getPublishedBlogs, title, page, limit]);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        msg,
        page,
        limit,
        title,
        setPage,
        setLimit,
        setTitle,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogsContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) throw new Error("Invalid Blog Context");
  return context;
};
