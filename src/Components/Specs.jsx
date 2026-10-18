export default function Specs({ currentProduct }) {
    return (
        <article>
            
            <div className="Specs_box ">
                <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-widest font-mono">
                        {currentProduct.category}
                    </p>
                    <h1 className="text-4xl font-bold">
                        {currentProduct.name}
                    </h1>
                    <p className="text-2xl font-mono">
                        {formatMoney(currentProduct.price)}
                    </p>
                </div>
                
                <p className="Specs_text leading-relaxed text-sm py-5">
                    {currentProduct.description}
                </p>
            </div>
            
            <div className="Specs_box flex flex-col text-sm border-t border-slate-800/80">
                {currentProduct.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-3 border-b border-slate-800/80">
                        <span className="">{spec.label}</span>
                        <span className="font-mono">{spec.value}</span>
                    </div>
                ))}
            </div>
        </article>
    )
}