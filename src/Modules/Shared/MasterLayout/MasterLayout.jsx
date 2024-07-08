import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
export default function MasterLayout() {
  return (
    <>
      <main className="min-h-screen dark:bg-gray-900">
        <NavBar />
        <Outlet />
      </main>
    </>
  );
}
