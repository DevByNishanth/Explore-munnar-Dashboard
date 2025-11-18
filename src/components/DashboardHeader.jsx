import { Menu } from "lucide-react";
import React from "react";
import { useGeneralData } from "../context/GeneralData";

const DashboardHeader = () => {
  const { setIsCollapsed, isCollapsed } = useGeneralData();
  return (
    <>
      <header
        className={`bg-[#282b30] transition-all duration-300 ${isCollapsed ? "w-[100%]" : "w-[80%]"
          } h-[60px]`}
      >
        <div className="content-container h-[100%] flex items-center px-4">
          <Menu
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 cursor-pointer w-5 h-5 "
          />
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
