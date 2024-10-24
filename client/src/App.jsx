import { Route, Routes } from "react-router-dom";

import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Bookmark } from "./pages/Bookmark";
import { Contact } from "./pages/Contact";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { VerifyFPassword } from "./pages/VerifyFPassword";
import { AdminBlogs } from "./pages/admin/blogs/List";
import { AddBlog } from "./pages/admin/blogs/Add";
import { BlogEdit } from "./pages/admin/blogs/Edit";

import { AdminUsers } from "./pages/admin/Users";
import { AdminProfile } from "./pages/admin/Profile";
import { AppLayout } from "./layouts/AppLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { NotFound } from "./pages/404";

import { PrivateRoute } from "./components/PrivateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-password" element={<VerifyFPassword />} />
        {/* Normal User Route */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="bookmark" element={<Bookmark />} />
        </Route>
        {/* Admin User Route */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="blogs"
            element={
              <PrivateRoute role={["admin", "user"]}>
                <AdminBlogs />
              </PrivateRoute>
            }
          />
          <Route
            path="blogs/:id"
            element={
              <PrivateRoute role={["admin", "user"]}>
                <BlogEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="blogs/add"
            element={
              <PrivateRoute role={["admin", "user"]}>
                <AddBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute role={["admin"]}>
                <AdminUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute role={["admin", "user"]}>
                <AdminProfile />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
