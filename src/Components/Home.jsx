
export default function Home({onEnter}) {
  return (
    <main>
        <div className="flex flex-col justify-center items-center gap-4 mt-8">
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={onEnter}>
                Go to Shop
            </button>
        </div>
    </main>
  );
}