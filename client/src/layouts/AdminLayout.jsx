import { Outlet } from "react-router-dom";
import { AdminNavbar } from "./AdminNavbar";

export const AdminLayout = () => {
  return (
    <main className="d-flex vh-100">
      <AdminNavbar />
      <div className="col-md-9 mt-5">
        <div className="container mt-5 d-grid gap-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
