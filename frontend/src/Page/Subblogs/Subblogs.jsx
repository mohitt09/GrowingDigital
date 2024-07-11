import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import { RiFacebookLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import style from './Subblogs.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

import Aos from "aos";
import "aos/dist/aos.css";

import { Helmet } from 'react-helmet';

function Subblogs() {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const Navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    const { slug } = useParams();

    useEffect(() => {
        console.log('Slug:', slug);
        // Fetch blog by slug from backend
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blog/${slug}`)
            .then(response => {
                setBlog(response.data);
                console.log('SingleData', response);
            })
            .catch(error => {
                console.error('Error fetching blog:', error);
            });
    }, [slug]);


    if (!blog) {
        return <Loader />;
    }

    const currentUrl = window.location.href;

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`, '_blank');
    };

    const shareOnLinkedIn = () => {
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`, '_blank');
    };

    return (
        <>

            <Helmet>
                <title>{blog.title} | Your Blog Site</title>
                <meta name="description" content={blog.excerpt || 'Read this amazing blog about ' + blog.title} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.excerpt || 'Read this amazing blog about ' + blog.title} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="article" />
            </Helmet>

            <header style={{ position: "sticky", top: '0', zIndex: '3' }}>
                <Navbar />
            </header>

            <article >
                <div data-aos="fade" className={style.heading}>
                    <h1 >{blog.title}</h1>
                    <p className='cursor-pointer' onClick={() => (Navigate('/blog'))}>Blog »{blog.title}</p>
                </div>
                <div className={style.content}>
                    <div data-aos="fade-up" className={style.box}>

                        <div className={style.p} dangerouslySetInnerHTML={{ __html: blog.content }} />

                        <aside data-aos="fade-down" className={style.share}>
                            <div className={style.link} onClick={shareOnFacebook}>
                                <RiFacebookLine size={24} />
                                <span className={style.tooltip}>Facebook</span>
                                <p>share this</p>
                            </div>
                            <div className={style.link} onClick={shareOnWhatsApp}>
                                <FaWhatsapp size={24} />
                                <span className={style.tooltip}>WhatsApp</span>
                                <p>share this</p>
                            </div>
                            <div className={style.link} onClick={shareOnLinkedIn}>
                                <FaLinkedinIn size={24} style={{ marginRight: '4px' }} />
                                <span className={style.tooltip}>LinkedIn</span>
                                <p>share this</p>
                            </div>
                        </aside >
                    </div>
                </div>
            </article >

            <Footer />
        </>
    );
}

export default Subblogs;
