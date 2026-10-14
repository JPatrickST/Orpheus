export default function Header({onHome}) {
    return (
        <header className="border-b border-stone-400 text-center">
            <button className="hover:text-stone-600 transition-colors duration-200 ease-in-out "
                onClick={onHome}>
                <h1 className="text-4xl font-bold mt-4 mb-4">
                    Orpheus
                </h1>
            </button>
        </header>
    )

}