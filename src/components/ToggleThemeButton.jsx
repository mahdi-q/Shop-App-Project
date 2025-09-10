"use client";

import { useDarkMode } from "@/contexts/DarkModeContext";
import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

function ToggleThemeButton({ className = "" }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    //  Now we are sure that the component is mounted
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
