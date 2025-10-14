import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";

export default function DarkModeToogle() {
  const { isDarkMode, handleToggle } = useDarkMode();
  return (
    <ButtonIcon onClick={handleToggle}>
      {isDarkMode ? <HiMiniSun /> : <HiMiniMoon />}
    </ButtonIcon>
  );
}
