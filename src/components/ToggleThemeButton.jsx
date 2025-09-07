import { useDarkMode } from "@/contexts/DarkModeContext";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

function ToggleThemeButton({ className = "" }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button onClick={toggleDarkMode} className={className}>
      {isDarkMode ? (
        <IoMoonOutline className="h-5 w-5" />
      ) : (
        <IoSunnyOutline className="h-5 w-5" />
      )}
    </button>
  );
}

export default ToggleThemeButton;
