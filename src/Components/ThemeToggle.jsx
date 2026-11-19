import { useState } from "react"

// The light / dark button. The theme is just a class on the <html> element:
//   <html class="dark">  -> dark mode (every dark: style turns on, and the dark colour variables apply)
//   <html>               -> light mode
export default function ThemeToggle() {

    // Start from whatever the page already is (the little script in index.html set it before React loaded)
    const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))

    const toggle = () => {
        const next = !dark
        const root = document.documentElement

        root.classList.add("theme-switching")        // turns on the colour fade (see index.css)
        root.classList.toggle("dark", next)          // the actual switch
        setTimeout(() => root.classList.remove("theme-switching"), 400)

        // Remember the choice for next time. It can fail in private windows, so it is wrapped in try/catch.
        try {
            localStorage.setItem("orpheus-theme", next ? "dark" : "light")
        } catch { /* nothing to do */ }

        setDark(next)
    }

    return (
        <button
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
            className="grid h-9 w-9 place-items-center rounded-btn border border-fg/20 text-fg transition hover:border-fg hover:bg-fg hover:text-canvas
                       dark:border-accent/50 dark:text-accent dark:hover:border-accent dark:hover:bg-accent dark:hover:text-canvas"
        >
            {dark ? (
                // sun: shown in dark mode, because pressing it gives you light
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
            ) : (
                // moon: shown in light mode, because pressing it gives you dark
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
                </svg>
            )}
        </button>
    )
}
