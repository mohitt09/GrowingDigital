import React, { useEffect } from 'react';

import Aos from "aos";
import "aos/dist/aos.css";

function Section() {

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  return (
    <div>
      <section data-aos="fade-up" className="flex flex-col  md:flex-row p-8">
        <p className="text-start  text-3xl md:text-4xl text-teal-800 w-full md:w-1/3 p-2 mb-4 font-light md:leading-normal leading-relaxed">
          Growing Digital is a young company with the vision to make the digital world accessible to everyone.
        </p>
        <p className="text-start text-lg md:text-2xl text-gray-800 w-full md:w-1/3 p-2  mb-4  font-light md:leading-normal leading-relaxed">
          Growing Digital is a blend of technologies, processes and analytics. We bring groundbreaking ecommerce, marketing and logistics platforms under one umbrella; designed to modernize your business and bring it to the digital age.
        </p>
        <p className="text-start text-lg md:text-2xl text-gray-800 w-full md:w-1/3 p-2  mb-4  font-light md:leading-normal leading-relaxed">
          At Growing Digital, we believe that the right understanding and technological edge can lead companies towards a successful future. Moreover, our full service range will help you in creating the best ecommerce solution that scales as your business grows.
        </p>
      </section>
    </div>
  );
}

export default Section;
