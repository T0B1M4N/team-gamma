import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const toggleSwitch = () => setIsSwitchOn((prev) => !prev);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppContext.Provider
      value={{
        isSwitchOn,
        toggleSwitch,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
