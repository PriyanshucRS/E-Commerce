import { Outlet } from "react-router-dom";

import { Navbar } from "../components/Navbar/Navbar";


export const MainLayout = () => {

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      
      <main className="grow pt-20">

        <Outlet/>
      </main>
    </div>
  );
};
