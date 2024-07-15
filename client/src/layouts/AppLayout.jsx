
import { AppNavbar } from "./AppNavbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div>
      <AppNavbar />
      <main className="container" style={{ minHeight: "620px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
