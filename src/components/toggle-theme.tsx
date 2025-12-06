"use client";
import { useTheme } from "next-themes";

export default function Toggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button className="text-red-600"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            Toggle Theme     <h1>
            Current Theme: {theme}
        </h1>
        </button>
    
    );
}
