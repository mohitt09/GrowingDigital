import React, { useEffect } from 'react'
import style from './Contact.module.css'
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import Form1 from '../../Component/Form1/Form1';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import Aos from "aos";
import "aos/dist/aos.css";


function Contact() {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Contact Us | Growing Digital</title>
                <meta name="description" content="Get in touch with Growing Digital for fully managed services and ready-made solutions to establish, market, and manage your business online. Discuss with our specialized relationship managers today!" />
                <meta name="keywords" content="contact, digital solutions, online business, digital marketing, managed services" />
            </Helmet>

            <div style={{ position: "sticky", top: '0', zIndex: '3' }}>
                <Navbar />
            </div>

            <section className={style.Contact}>
                <h1 data-aos="fade">
                    Get in touch with us
                </h1>
                <p data-aos="fade">
                    Growing Digital provides you with fully managed services and ready-made solutions to establish, market and manage your business online. We are a one-stop-shop for digitalizing your business!
                </p>
                <p data-aos="fade">
                    Discuss with one of our specialized relationship managers today
                </p>

                <div className={style.container}>

                    <div className={style.container2}>
                        <Form1 />
                    </div>

                    <div data-aos="fade" className={style.container3}>
                        <p>
                            Growing Digital offers a one stop shop platform that lets you sell wherever your customers are. We provide you with everything you need to sell online.
                        </p>

                        <button onClick={() => { navigate('/about') }} className={style.button}>
                            Learn more about us
                        </button>

                        <h5>
                            Contact
                        </h5>

                        <h6>
                            +91 95999 01561

                        </h6>
                        <h6>
                            info@growingdigital.in
                        </h6>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact