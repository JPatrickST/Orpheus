export default function Specs() {
    return (
        <article>
            
            <div className="Specs_box ">
                <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-widest font-mono">
                        Strings / Violin
                    </p>
                    <h1 className="text-4xl font-bold">
                        HP Violin
                    </h1>
                    <p className="text-2xl font-mono">
                        $ 1,000
                    </p>
                </div>
                
                <p className="Specs_text leading-relaxed text-sm py-5">
                    A warm, singing violin built for the concert stage. The spruce top gives it a bright voice, and the maple back keeps the low notes rich.
                </p>
            </div>
            
            <div className="Specs_box flex flex-col text-sm border-t border-slate-800/80">
                <div className="flex justify-between py-3 border-b border-slate-800/80">
                    <span className="">Size</span>
                    <span className="font-mono">4/4 full size</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-800/80">
                    <span className="">Top</span>
                    <span className="font-mono">Aged spruce</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-800/80">
                    <span className="">Back and Slides</span>
                    <span className="font-mono">Flamed maple</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-800/80">
                    <span className="">Fittings</span>
                    <span className="font-mono">Ebony</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-800/80">
                    <span className="">Body Length</span>
                    <span className="font-mono">356 mm</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-800/80">
                    <span className="">Weight</span>
                    <span className="font-mono">440g</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-800/80">
                    <span className="">Includes</span>
                    <span className="font-mono">Bow, case, rosin</span>
                </div>
            </div>
        </article>
    )
}