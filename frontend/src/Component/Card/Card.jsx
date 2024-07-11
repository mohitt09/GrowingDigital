import React, { useEffect } from 'react'

import Aos from "aos";
import "aos/dist/aos.css";


function Card() {

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <div className="py-8">
            <section data-aos="fade-up" className="flex flex-wrap justify-evenly px-4 sm:px-8">

                <div className="bg-gray-100 flex justify-center flex-col  p-10 m-6 rounded-lg text-center transition-shadow duration-300 w-full sm:w-1/4 h-64">
                    <h3 className="text-6xl font-semibold text-teal-900">
                        10+
                    </h3>
                    <p className="text-lg sm:text-xl font-light text-gray-700 mt-2">
                        Diversified Industries
                    </p>
                </div>

                <div className="bg-gray-100 flex justify-center flex-col p-10 m-6 rounded-lg text-center transition-shadow duration-300 w-full sm:w-1/4 h-64">
                    <h3 className="text-6xl font-semibold text-teal-900">
                        100K+
                    </h3>
                    <p className="text-lg sm:text-xl font-light text-gray-700 mt-2">
                        Online Transactions
                    </p>
                </div>

                <div className="bg-gray-100 flex justify-center flex-col p-10 m-6 rounded-lg text-center transition-shadow duration-300 w-full sm:w-1/4 h-64">
                    <h3 className="text-6xl font-semibold text-teal-900">
                        50+
                    </h3>
                    <p className="text-lg sm:text-xl font-light text-gray-700 mt-2">
                        Satisfied Customers
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Card;
