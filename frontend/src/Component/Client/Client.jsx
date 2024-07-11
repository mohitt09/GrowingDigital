import React, { useEffect } from 'react'
import Aos from "aos";
import "aos/dist/aos.css";
function Client() {

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <div className="py-8">
            <section className="px-4 sm:px-8">
                <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-teal-900 text-center">
                    What our clients say
                </h2>

                <div data-aos="fade-up" className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="p-4 sm:p-6 w-[100%]">
                        <p className="text-xl  sm:text-xl md:text-2xl text-gray-700">
                        GrowingDigital has been a game-changer for my expanding business. Their exceptional expertise and unwavering dedication have not only met but far exceeded every expectation I set for myself. Partnering with them has been instrumental in our ongoing success and growth.
                        </p>
                        {/* <h5 className="text-lg sm:text-xl md:text-2xl text-teal-900 mt-2">
                            Richard Simms
                        </h5>
                        <h6 className="text-base sm:text-lg md:text-xl text-gray-700">
                            Founder – Hemisferio
                        </h6> */}
                    </div>

                </div>
            </section>
        </div>
    );
}

export default Client;
