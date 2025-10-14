import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const darkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  function handleToggle() {
    setIsDarkMode((dark) => !dark);
  }
  return (
    <darkModeContext.Provider
      value={{
        isDarkMode,
        handleToggle,
      }}
    >
      {children}
    </darkModeContext.Provider>
  );
}
function useDarkMode() {
  const context = useContext(darkModeContext);
  if (context === undefined)
    throw new Error("Context User Where it Can't be used");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { useDarkMode, DarkModeProvider };
