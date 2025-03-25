import React, { ReactNode, createContext, useContext, useState } from "react";

interface GlobalContextType {
  section: string;
  setSection: React.Dispatch<React.SetStateAction<string>>;
}

const initialContext: GlobalContextType = {
  section: "",
  setSection: () => {},
};

const GlobalContext = createContext<GlobalContextType>(initialContext);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [section, setSection] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        section,
        setSection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
