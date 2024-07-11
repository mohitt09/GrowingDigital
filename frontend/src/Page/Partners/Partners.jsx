import React, { useEffect } from 'react'
import style from './Partners.module.css'
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import { FiSmartphone } from "react-icons/fi";
import Form1 from '../../Component/Form1/Form1'

import Aos from "aos";
import "aos/dist/aos.css";

import { Helmet } from 'react-helmet';
import MOw from '../../Assets/Dell.png';
import Aryan from '../../Assets/Cisco.png';
import Microsoft from '../../Assets/Microsoft.jpg';

function Partners() {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <>
            <Helmet>
                <title>Our Partners | Growing Digital</title>
                <meta name="descrip
                tion" content="GrowingDigital collaborates with leading companies to provide top-notch digital solutions. Explore our partnerships with Dell, Microsoft, Cisco, and more." />
            </Helmet>

            <header style={{ position: "sticky", top: '0', zIndex: '3' }}>
                <Navbar />
            </header>

            <main>
                <section className={style.Partners}>
                    <div className={style.back}>
                        <div data-aos="fade" className={style.content}>
                            <h1> Our Partners </h1>
                            <h2> Excellence through collaboration </h2>
                            <p>
                                GrowingDigital collaborates in partnerships with several companies to provide you with the digital solutions that you need to grow your business to the next level
                            </p>
                        </div>
                    </div>
                </section>

                <section className={style.Partners2}>
                    <h1>
                        Product Partners
                    </h1>
                    <hr className={style.line} />
                    {/* <p data-aos="fade-up" >
                    A useful addition to the growdigital portfolio: the products and systems of our Product Partners
                    Are you searching for additional options for our products? Or customized solutions for special applications? Our Product Partners, with whom we closely cooperate around the world, can definitely help.Based on their expertise in specific fields, these recognized experts are a useful addition to our comprehensive portfolio – with products and systems that they independently develop, manufacture and distribute. What objective do we pursue with these cooperations? Enabling you to benefit from the most complete and efficient solutions of the highest quality, thereby improving your competitiveness over the long term.
                </p> */}
                </section>

                <section className={style.Partners}>

                    <div className={style.scroller}>
                        <img className='rounded-md' src={MOw} alt="Dell Logo" />
                        <img className='rounded-md' src={Microsoft} alt="Microsoft Logo" />
                        <img src={Aryan} alt="Cisco Logo" />
                        <img className='rounded-md' src={MOw} alt="Dell Logo" />
                        <img className='rounded-md' src={Microsoft} alt="Microsoft Logo" />
                        <img src={Aryan} alt="Cisco Logo" />
                        <img className='rounded-md' src={MOw} alt="Dell Logo" />
                        <img className='rounded-md' src={Microsoft} alt="Microsoft Logo" />
                        <img src={Aryan} alt="Cisco Logo" />
                    </div>
                </section>


                <section className={style.form}>

                    <div className={style.container}>

                        <div data-aos="fade" className={style.info}>

                            <p>
                                Get a personal consultation and start digitalizing today!
                            </p>

                            <h4 className='mt-[1em]'> <FiSmartphone />	Email</h4>
                            <h4 className='mb-[1em]'>info@growdigital.com</h4>

                            <h4 className='mt-[1em]'> <FiSmartphone />	Phone</h4>
                            <h4 className='mb-[1em]'>+971 50 3122672</h4>

                        </div>


                        <div className={style.info2}>
                            <Form1 />
                        </div>

                    </div>

                </section>
            </main>

            <Footer />
        </>
    )
}

export default Partners