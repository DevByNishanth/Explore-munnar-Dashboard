import React from "react";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  return (
    <>
      <section className="flex gap- w-[100%]">
        <Sidebar />
        <Dashboard />
      </section>
    </>
  );
};

export default Homepage;
