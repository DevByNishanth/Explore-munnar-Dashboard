import { createContext, useContext, useState } from "react";

const GeneralData = createContext();
export function GeneralDataProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [bookingSelectedTab, setSelectedTab] = useState("hotelsBookings");
  return (
    <GeneralData.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        bookingSelectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </GeneralData.Provider>
  );
}

export function useGeneralData() {
  return useContext(GeneralData);
}
