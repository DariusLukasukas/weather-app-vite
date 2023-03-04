import { BsMoonStars, BsSun } from "react-icons/bs";
import { useState, useEffect } from "react";

function ThemeSwitchToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Set the theme
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle the theme
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      <button
        className="flex items-center justify-center rounded-md p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <BsMoonStars className="text-xl text-gray-800" />
        ) : (
          <BsSun className="text-xl text-yellow-300" />
        )}
      </button>
    </>
  );
}
export default ThemeSwitchToggle;
