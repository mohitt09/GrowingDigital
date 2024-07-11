import React ,{useEffect}from 'react'
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import style from './Training.module.css'
import { FiSmartphone } from "react-icons/fi";
import Form1 from '../../Component/Form1/Form1'
import img from '../../Assets/Training01.jpg'
import Client from '../../Component/Client/Client';
import Card from '../../Component/Card/Card';
import Value from '../../Component/Value/Value';
import Aos from "aos";
import "aos/dist/aos.css";

function Training() {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <>
            <div style={{ position: "sticky", top: '0', zIndex: '3' }}>
                <Navbar />
            </div>

            <section className={`${style.bg} md:p-[10%] p-[2%] `}>

                <div data-aos="fade-up" className=' w-[100%]  md:w-[80%] bg-white bg-opacity-75 rounded-xl p-[4%] '>

                    <h1 className='md:text-4xl  text-2xl  text-green-500 mb-[8%] md:mb-[5%]'>
                        Training Business Unit
                    </h1>

                    <h2 className=' md:text-5xl  sm:text-7xl  text-5xl  text-green-900 mb-[8%] md:mb-[5%] sm:w-[90%] w-[93%]'>
                        Recognizing the significance of knowledge and customer empowerment, we established Grow Digital Academy.
                    </h2>

                    <p className='text-xl md:text-3xl text-zinc-950 w-[100%]  md:w-[90%] mb-[8%] md:mb-[5%]'>
                        In collaboration with the Italian professional training service company, Educational Services Ltd. They provided comprehensive programs and expert guidance to equip individuals and organizations with the skills needed to navigate the dynamic digital landscape and scale their businesses.
                    </p>

                    <h3 className='font-semibold text-2xl md:text-3xl mb-[8%] md:mb-[5%]'>
                        Our focus training/workshop is on:
                    </h3>

                    <ul className="list-disc mb-[8%] md:mb-[5%] pl-[5%]">
                        {list.map((item, index) => (
                            <li className='text-xl md:text-2xl mb-[2%]' key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>


            <section className='mt-[2em] md:flex p-[1%] gap-3 items-center'>

                <div data-aos="fade-up" className='md:w-[40%]'>
                    <img className='rounded-xl' src={img} alt="" />
                </div>

                <div data-aos="fade-down" className='md:w-[60%] md:p-[7%] p-[1%]'>

                    <h1 className='md:text-3xl text-2xl text-green-500 mb-[5%] pt-[4%]'>
                        Industries
                    </h1>

                    <h2 className='md:text-4xl text-3xl  text-green-800 mb-[5%]'>
                        We enjoy working with a wide variety of service businesses.
                    </h2>
                    <p className='md:text-3xl text-xl text-zinc-600 mb-[5%] text-justify'>
                        Our products and services are generalized, so that they can fit into a large variety of businesses. Our products work for you right out of the box, so start digitalizing your business today.
                    </p>
                </div>
            </section>



            <Card />

            <Value />


            <Client data-aos="fade-up"/>

            <section className={style.formh}>
                <h1>
                    Need a personalized solution?
                </h1>
                <p data-aos="fade-up">
                    Talk to one of our customer solution engineers today to discuss how your business can be taken to the next level
                </p>

            </section>

            <section className={style.form}>

                <div  className={style.container}>

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

            <Footer />
        </>
    )
}

export default Training


const list = [
    'Coaching',
    'Effective Communications',
    'Objection Handling',
    'Marketing Growth',
    'Customer Experience',
    'Managing Complex Sale',
    'Negotiation Skills'
];