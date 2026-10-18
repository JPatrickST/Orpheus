export default function Header({onHome, products, selectedProduct, setSelectedProduct}) {
    return (
        <header className="border-b border-stone-400 text-center">
            <h1 className="text-4xl font-bold text-stone-800 py-4 transition-colors duration-200 ease-in-out ">
                <button className="hover:text-stone-600"
                    onClick={onHome}>
                    Orpheus
                </button>
            </h1>

            <nav className="flex flex-wrap justify-center items-center gap-6 py-4">
                {products.map((product) => (
                    <button 
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)} 
                        className={
                            product.id === selectedProduct ? 
                            "font-bold border-b-2 border-stone-800" 
                            : "text-stone-600 hover:text-stone-900"
                        }>
                        {product.name}
                    </button>
                ))}
            </nav>
        </header>
    )

}