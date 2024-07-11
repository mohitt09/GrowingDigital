import React, { useEffect } from 'react'
import style from './Security.module.css'
import Navbar from '../../Component/Navbar/Navbar'
import Footer from '../../Component/Footer/Footer'
import Value from '../../Component/Value/Value'
import Form1 from '../../Component/Form1/Form1'
import img from '../../Assets/Web.jpg'
import software from '../../Assets/SEO.jpg'
import { FiSmartphone } from "react-icons/fi";
import Card from '../../Component/Card/Card'
import banner from '../../Assets/Camp.webp'
import Service from '../../Assets/Service.jpg'
import markett from '../../Assets/Social.jpg'
import Link from '../../Assets/Link.jpeg'
import brand from '../../Assets/brand.jpg'

import { useNavigate } from 'react-router-dom'

import { Helmet } from 'react-helmet';
import Aos from "aos";
import "aos/dist/aos.css";

function Security() {


    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <>
            <Helmet>
                <title>Our Service | Growing Digital</title>
                <meta name="description" content="Explore our wide range of digital services including web development, SEO, social media marketing, and more. Empower your brand with our innovative solutions." />
            </Helmet>

            <header style={{ position: "sticky", top: '0', zIndex: '3' }}>
                <Navbar />
            </header>

            <section className={style.sec}>


                <div data-aos="fade-up" className={style.bg} >

                    <img src={img} alt="Web Development" />

                </div>

                <div data-aos="fade-down" className={style.content}>
                    <h1>
                        WEB DEVELOPMENT
                    </h1>
                    <h2>
                        Innovative Web Development Solutions
                    </h2>
                    <p>
                        From concept to launch, we create dynamic, responsive websites that captivate and convert. Our expert team ensures your online presence is visually stunning and functionally flawless, using the latest technologies for seamless user experiences. Transform your ideas into reality with our comprehensive web development services, empowering your brand and elevating your digital strategy.
                    </p>

                    <div onClick={() => { navigate('/web-development') }} className={style.containerButton}>
                        <div className={`${style.hover} ${style.bt1} `}></div>
                        <div className={`${style.hover} ${style.bt2}`}></div>
                        <div className={`${style.hover} ${style.bt3}`}></div>
                        <div className={`${style.hover} ${style.bt4}`}></div>
                        <div className={`${style.hover} ${style.bt5}`}></div>
                        <div className={`${style.hover} ${style.bt6}`}></div>
                        <button className={style.btn}></button>
                    </div>

                </div>
            </section>


            <section className={style.alt}>


                <div data-aos="fade-down" className={style.content}>
                    <h1>
                        SEO ALCHEMY
                    </h1>
                    <h2>
                        Search Engine Optimization (SEO)
                    </h2>

                    <p>
                        We make your website visible on search
                        engines like Google, Bing, and Yahoo. With
                        expert keyword research, on-page
                        optimization, and backlink building, we ensure
                        you reach the top of the search results.
                    </p>

                    <div onClick={() => { navigate('/seo-alchemy') }} className={style.containerButton}>
                        <div className={`${style.hover} ${style.bt1} `}></div>
                        <div className={`${style.hover} ${style.bt2}`}></div>
                        <div className={`${style.hover} ${style.bt3}`}></div>
                        <div className={`${style.hover} ${style.bt4}`}></div>
                        <div className={`${style.hover} ${style.bt5}`}></div>
                        <div className={`${style.hover} ${style.bt6}`}></div>
                        <button className={style.btn}></button>
                    </div>


                </div>

                <div data-aos="fade-up" className={style.bg} >
                    <img src={software} alt="SEO Alchemy" />
                </div>

            </section>




            <section className={style.sec}>


                <div data-aos="fade-up" className={style.bg} >
                    <img src={banner} alt="Campaign Design" />
                </div>

                <div data-aos="fade-down" className={style.content}>
                    <h1>
                        CAMPAIGN DESIGN
                    </h1>
                    <h2>
                        Content That Captivates
                    </h2>
                    <p>
                        Our content marketing strategies include
                        high-quality blogs, articles, infographics,
                        videos, and more. We help you establish
                        authority in your industry and keep your
                        audience engaged.
                    </p>

                    <div onClick={() => { navigate('/campage-design') }} className={style.containerButton}>
                        <div className={`${style.hover} ${style.bt1} `}></div>
                        <div className={`${style.hover} ${style.bt2}`}></div>
                        <div className={`${style.hover} ${style.bt3}`}></div>
                        <div className={`${style.hover} ${style.bt4}`}></div>
                        <div className={`${style.hover} ${style.bt5}`}></div>
                        <div className={`${style.hover} ${style.bt6}`}></div>
                        <button className={style.btn}></button>
                    </div>

                </div>
            </section>


            <section className={style.alt}>

                <div data-aos="fade-down" className={style.content}>
                    <h1>
                        SOCIAL MEDIA MARKETING
                    </h1>
                    <h2>
                        Experience The Change
                    </h2>

                    <p>
                        Our social media campaigns on platforms like
                        Facebook, Instagram, Twitter, and LinkedIn
                        will allure your audience. Compelling design,
                        exciting contests, and expert community
                        management are our specialties.
                    </p>

                    <div onClick={() => { navigate('/social-media') }} className={style.containerButton}>
                        <div className={`${style.hover} ${style.bt1} `}></div>
                        <div className={`${style.hover} ${style.bt2}`}></div>
                        <div className={`${style.hover} ${style.bt3}`}></div>
                        <div className={`${style.hover} ${style.bt4}`}></div>
                        <div className={`${style.hover} ${style.bt5}`}></div>
                        <div className={`${style.hover} ${style.bt6}`}></div>
                        <button className={style.btn}></button>
                    </div>

                </div>

                <div data-aos="fade-up" className={style.bg} >

                    <img src={markett} alt="Social Media Marketing" />

                </div>

            </section>


            <section className={style.sec}>


                <div data-aos="fade-up" className={style.bg} >

                    <img src={Link} alt="LinkedIn Optimization" />

                </div>

                <div data-aos="fade-down" className={style.content}>
                    <h1>
                        LINKEDIN OPTIMIZATION
                    </h1>
                    <h2>
                        LinkedIn Optimization For Success
                    </h2>
                    <p>
                        Unlock Your LinkedIn Potential
                        Maximize your LinkedIn profile's potential
                        with our services: Profile Enhancement;
                        Resume Perfection; and Cover Letter
                        Brilliance.
                    </p>

                    <div onClick={() => { navigate('/linkedin-optimization') }} className={style.containerButton}>
                        <div className={`${style.hover} ${style.bt1} `}></div>
                        <div className={`${style.hover} ${style.bt2}`}></div>
                        <div className={`${style.hover} ${style.bt3}`}></div>
                        <div className={`${style.hover} ${style.bt4}`}></div>
                        <div className={`${style.hover} ${style.bt5}`}></div>
                        <div className={`${style.hover} ${style.bt6}`}></div>
                        <button className={style.btn}></button>
                    </div>

                </div>
            </section>


            <section className={style.alt}>

                <div data-aos="fade-down"  className={style.content}>
                    <h1 className='uppercase'>
                        Design-As-A-Service
                    </h1>
                    <h2>
                        Crafting Your Career Success
                    </h2>

                    <p>
                        Our DaaS services redefine your digital presence.
                    </p>
                    <p>
                        presence Online Reputation Management.
                    </p>
                    <p>
                        Social Media Domination.
                    </p>
                    <p>
                        SEO Mastery.
                    </p>
                    <p>
                        Content Creation Expertise.
                    </p>

                    <div onClick={() => { navigate('/design-service') }} className={style.containerButton}>
                        <div className={`${style.hover} ${style.bt1} `}></div>
                        <div className={`${style.hover} ${style.bt2}`}></div>
                        <div className={`${style.hover} ${style.bt3}`}></div>
                        <div className={`${style.hover} ${style.bt4}`}></div>
                        <div className={`${style.hover} ${style.bt5}`}></div>
                        <div className={`${style.hover} ${style.bt6}`}></div>
                        <button className={style.btn}></button>
                    </div>

                </div>

                <div data-aos="fade-up" className={style.bg} >

                    <img src={Service} alt="Design-As-A-Service" />

                </div>

            </section>


            <section className={style.sec}>


                <div data-aos="fade-up" className={style.bg} >

                    <img src={brand} alt="Brand Building" />

                </div>

                <div data-aos="fade-down" className={style.content}>
                    <h1>
                        BRAND BUILDING

                    </h1>
                    <h2>
                        Brand Building Beyond Boundaries Elevating Reputations
                    </h2>
                    <p>
                        Our service empowers your brand to transcend
                        borders with creative innovation, forging a
                        cross-cultural brand identity that ensures global
                        recognition and resonance.
                    </p>


                    <div onClick={() => { navigate('/brand-building') }} className={style.containerButton}>
                        <div className={`${style.hover} ${style.bt1} `}></div>
                        <div className={`${style.hover} ${style.bt2}`}></div>
                        <div className={`${style.hover} ${style.bt3}`}></div>
                        <div className={`${style.hover} ${style.bt4}`}></div>
                        <div className={`${style.hover} ${style.bt5}`}></div>
                        <div className={`${style.hover} ${style.bt6}`}></div>
                        <button className={style.btn}></button>
                    </div>

                </div>
            </section>


            <Card />

            <Value />


            <section className={style.formh}>
                <h1>
                    Need a personalized solution?
                </h1>
                <p data-aos="fade-up">
                    Talk to one of our customer solution engineers today to discuss how your business can be taken to the next level
                </p>

            </section>

            <section className={style.form}>

                <div className={style.container}>

                    <div data-aos="fade" className={style.info}>

                        <p>
                            Get a personal consultation and start digitalizing today!
                        </p>

                        <h4 className='mt-[1em]'> <FiSmartphone />	Email</h4>
                        <h4 className='mb-[1em]'>info@growingdigital.in</h4>

                        <h4 className='mt-[1em]'> <FiSmartphone />	Phone</h4>
                        <h4 className='mb-[1em]'> +91 95999 01561</h4>

                    </div>


                    <div className={style.info2}>
                        <Form1 />
                    </div>

                </div>

            </section>

            <Footer />
        </>
    )
}

export default Security