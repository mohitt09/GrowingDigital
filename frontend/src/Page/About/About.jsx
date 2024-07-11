import React, { useEffect } from 'react'
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import style from './About.module.css'
// import img from '../../Assets/About.jpg'
import img2 from '../../Assets/About.png'
import img3 from '../../Assets/Market.jpg'
import img4 from '../../Assets/concept.jpg'

import value from '../../Assets/value.png'
import mission2 from '../../Assets/mission2.png'
import vision2 from '../../Assets/vision2.png'

import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";


function About() {

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <>
            <Helmet>
                <title>About Us | Growing Digital</title>
                <meta name="description" content="Learn more about Growing Digital, our mission, vision, and values. We empower businesses in the digital age with expert solutions." />
                <meta name="keywords" content="Growing Digital, digital solutions, digital marketing, ecommerce, business transformation" />
                
            </Helmet>

            <header style={{ position: "sticky", top: '0', zIndex: '3' }}>
                <Navbar />
            </header>

            <main>
                <div className={style.about}>
                    <div className={style.aboutimg}>
                        <h1 data-aos="fade">
                            Growing Digital
                        </h1>
                    </div>
                </div>

                {/* <Section /> */}

                <section className={style.home3}>

                    <div data-aos="fade-up" className={style.left}>
                        <img src={img2} alt="WHO WE ARE" />
                    </div>

                    <div data-aos="fade-down" className={style.right}>
                        <h6>
                            WHO WE ARE?
                        </h6>
                        <p>
                            At Growing Digital, our journey has seen us
                            cultivate deep roots and a vision that drives us.
                            We've fostered an extensive network spanning
                            various industries, granting us profound insights into
                            regional markets. Through these connections, we've
                            forged collaborations with industry leaders, fueling
                            our mission: to persistently enhance, expand, and
                            deliver innovative designs, upscaling brand image,
                            and on-time delivery, providing exceptional services
                            to our cherished clients.
                        </p>

                    </div>

                </section>




                <section className={style.home4}>

                    <div data-aos="fade-up" className={style.left}>
                        <img className='rounded-md' src={img3} alt="Our Expertise" />
                    </div>

                    <div data-aos="fade-down" className={style.right}>
                        <h6>
                            Excel with Our Expertise
                        </h6>
                        <p>
                            At Growing Digital, we're not just a company; we're your trusted digital partners. With a combined professional experience of a decade, we bring a wealth of knowledge and expertise to the table, making it easier for you to connect with your clients through our work. Our suite of services goes beyond the ordinary, catering to your every need and ensuring your resounding success in the dynamic digital arena. We believe in building lasting relationships and driving results that matter.
                        </p>

                    </div>

                </section>


                <section className={style.home3}>

                    <div data-aos="fade-up" className={style.left}>
                        <img src={img4} alt="VALUE PROPOSITION" />
                    </div>

                    <div data-aos="fade-down" className={style.right}>

                        <h6>
                            VALUE PROPOSITION

                        </h6>
                        <ul className=" pl-6">
                            <li className="mb-2">Upscaling Brand Image</li>
                            <li className="mb-2">98% Client Satisfaction</li>
                            <li className="mb-2">100% On-Time Delivery</li>
                            <li className="mb-2">Onboard Domain Expert</li>
                            <li className="mb-2">30% Organic Growth</li>
                            <li className="mb-2">Innovative Designs</li>
                        </ul>
                    </div>

                </section>


                <section className={style.value}>

                    <div className={style.container}>

                        <div data-aos="fade" className={style.one}>
                            <img style={{ width: '60%' }} src={value} alt="Value" />
                            <h1>Our Value</h1>
                        </div>

                        <div data-aos="fade-up" className={style.two}>

                            <ul>

                                <li>Leadership: The courage to shape a better future.</li>

                                <li>Quality: Uncompromising Quality in Every Step.</li>

                                {/* <li>Integrity: Be real without compromise.</li> */}

                                <li>Trust: Vital for Customer and Partner Confidence.</li>

                                <li>Accountability: If it is to be, it’s up to me.</li>

                                <li>Commitment: We are fully committed to our customers, partner and community.</li>

                                <li>Collaboration: Leverage collective genius.</li>

                                {/* <li>Passion: Committed in heart and mind as part of our DNA.</li> */}

                            </ul>

                        </div>

                    </div>

                </section>


                <section className={style.our}>

                    <div data-aos="fade-down" className={style.our1}>
                        <img src={mission2} alt="Mission" />
                        <h1>
                            Our Mission
                        </h1>
                        <hr className={style.line} />
                        <p>
                            We empower businesses in the digital age with expert
                            solutions, emphasizing a client-centric approach,
                            innovation, ethical practices, community impact,
                            while maintaining a commitment to measurable
                            results.
                        </p>
                    </div>


                    <div data-aos="fade-down" className={style.our2}>

                        <img src={vision2} alt="vision" />

                        <h1>
                            Our Vision
                        </h1>

                        <hr className={style.line} />

                        <p>
                            We aim to transform businesses into digital
                            success stories through innovation and data-driven
                            strategies, consistently delivering exceptional
                            results, empowering clients to thrive in the digital
                            landscape.
                        </p>

                    </div>

                </section>


                <section data-aos="fade" className={style.back}>
                    <p className={style.backp}>
                        Growing Digital understands that digitizing is a complex process
                    </p>
                    <p>
                        It’s a blend of technologies, processes and analytics. We bring groundbreaking ecommerce, marketing and logistics platforms under one umbrella; designed to modernize your business and bring it to the digital age.
                    </p>
                </section>

            </main>

            <Footer />
        </>
    )
}

export default About