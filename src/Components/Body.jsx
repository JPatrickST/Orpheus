import Specs from "./Specs";
import PaymentDetails from "./PaymentDetails";

export default function Body({ currentProduct }) {

    return (
        <main>
            <div className="flex flex-row justify-center items-center max-w-5xl mx-auto gap-6 mt-6">
                <div className="flex-1 flex flex-col justify-center items-center gap-6 w-full max-w-2xl min-w-0">
                    <div className="w-full bg-stone-200 rounded-lg p-4">
                        <h1>
                            Picture
                        </h1>   
                    </div>
                    
                    <div className="w-full bg-stone-200 rounded-lg p-4">
                        <h1>
                            Sound Sample
                        </h1>
                    </div>
                </div>
        
                <div className="flex-1 flex flex-col justify-center items-center gap-6 w-full max-w-2xl min-w-0">
                    <div className="w-full bg-stone-200 rounded-lg p-4">
                        <Specs
                            currentProduct={currentProduct}
                        />
                    </div>
                    <div className="w-full bg-stone-200 rounded-lg p-4">
                        <PaymentDetails />
                    </div>
                    
                    
                </div>
            </div>    
        </main>
    )

}