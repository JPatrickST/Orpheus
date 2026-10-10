import { useState, useEffect } from "react";

export default function PaymentDetails() {
    const [paymentDetails, setPaymentDetails] = useState(null);

    return (
        <>
            <div className="py-7 border-b border-slate-800/60">
                <h1 className="text-4xl font-bold py-5">
                    Buy and Ship
                </h1>
                <div className="w-full">
                    <label 
                        htmlFor="name" 
                        className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="fullName"
                        placeholder="Juan Dela Cruz"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="w-full mt-4">
                    <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="juan.dela.cruz@example.com"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="w-full mt-4">
                    <label 
                        htmlFor="streetAddress" 
                        className="block text-sm font-medium text-gray-700">
                        Street Address
                    </label>
                    <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        placeholder="123 Main Street"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-row gap-4 mt-4">
                    <div className="w-full">
                        <label 
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Manila"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="w-full">
                        <label 
                            htmlFor="postalCode"
                            className="block text-sm font-medium text-gray-700">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            placeholder="1000"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-4 mt-4">
                    <div className="w-full">
                        <label 
                            htmlFor="shippingAddress"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Ship To
                        </label>
                        <select
                            id="shippingAddress"
                            //value={shippingAddress}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Philippines">Philippines</option>
                            <option value="Rest of Asia">Rest of Asia</option>
                            <option value="Rest of World">Rest of World</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label 
                            htmlFor="Quantity"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="Quantity"
                            name="Quantity"
                            min="1"
                            defaultValue="1"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                
                <div className="w-full mt-4">
                    <label 
                        htmlFor="paymentMethod"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Payment Method
                    </label>
                    <select
                        id="paymentMethod"
                        //value={paymentMethod}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
            </div>

            <div>
                
            </div>      
        </>

    )
}