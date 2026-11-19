import { useNavigate } from "react-router-dom"

// A centred message for "loading" and "something went wrong" screens.
export default function PageMessage({ title, text, action, onAction, pulse }) {
    const navigate = useNavigate()

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className={`font-display text-3xl sm:text-4xl ${pulse ? "animate-pulse" : ""}`}>
                {title}
            </h1>
            {text && <p className="max-w-md text-soft dark:italic">{text}</p>}
            {action && (
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                    <button className="btn-primary" onClick={onAction}>{action}</button>
                    <button className="btn-ghost" onClick={() => navigate("/")}>Back home</button>
                </div>
            )}
        </main>
    )
}
