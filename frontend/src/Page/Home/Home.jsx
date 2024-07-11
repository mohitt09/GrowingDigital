import React, { useState, useEffect } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import style from './Home.module.css';

import SEO from '../../Assets/Two.jpg';
import Three from '../../Assets/three.jpg';

import Four from '../../Assets/four.avif';
import Linkdin from '../../Assets/five.jpg';
import Social from '../../Assets/six.avif';

import img from '../../Assets/home.png';
import MOw from '../../Assets/Dell.png';
import Aryan from '../../Assets/Cisco.png';
import Microsoft from '../../Assets/Microsoft.jpg';
import { useNavigate } from 'react-router-dom';
import Aos from "aos";
import "aos/dist/aos.css";
import { Helmet } from 'react-helmet';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [SEO, Three, Four, Linkdin, Social];

const services = [
  {
    title: "WEB DEVELOPMENT",
    description: "We bring websites and web apps to life. From sleek designs to user-friendly CMS, our experts craft solutions to fit your needs. Experience the benefits - increased conversions, stronger brand image. Trustworthy visuals and clear communication ensure a smooth journey. Let's build your online success. Contact us today!"
  },
  {
    title: "SOCIAL MEDIA MARKETING",
    description: "Our social media campaigns on platforms like Facebook, Instagram, Twitter, and LinkedIn will allure your audience. Compelling design, exciting contests, and expert community management are our specialties."
  },
  {
    title: "SEO ALCHEMY",
    description: "We make your website visible on search engines like Google, Bing, and Yahoo. With expert keyword research, on-page optimization, and backlink building, we ensure you reach the top of the search results."
  },
  {
    title: "BRAND BUILDING",
    description: "Our service empowers your brand to transcend borders with creative innovation, forging a cross-cultural brand identity that ensures global recognition and resonance."
  }
];

const cards = [
  {
    title: "BRAND BUILDING",
    description: "Craft a memorable brand identity that resonates with your audience. Whether you're launching a new brand or redefining your existing presence, our Brand Building services focus on creating authentic connections and fostering brand loyalty."
  },
  {
    title: "SEO ALCHEMY",
    description: "Unlock the power of search engines with our SEO Alchemy services. We blend cutting-edge SEO strategies with data-driven insights to enhance your online visibility and drive organic traffic. Stay ahead of the competition with tailored SEO solutions."
  },
  {
    title: "CAMPAIGN DESIGN",
    description: "From concept to execution, our Campaign Design services are designed to captivate your audience and drive results. We craft innovative campaign strategies that resonate across digital and traditional channels, ensuring maximum impact and engagement."
  },
  {
    title: "DESIGN-AS-A-SERVICE",
    description: "Elevate your digital presence with our Design-as-a-Service offerings. Whether it's web design, UI/UX enhancements, or creative content creation, our team delivers aesthetically pleasing and functional designs tailored to your unique brand requirements."
  },
  {
    title: "LINKEDIN OPTIMIZATION",
    description: "Optimize your LinkedIn presence and leverage the platform's professional network to achieve your business objectives. Our LinkedIn Optimization services focus on profile enhancement, content strategy, and lead generation, helping you connect with industry professionals and decision-makers."
  }
];

function Home() {

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Your Gateway to the Digital Frontier | Home </title>
        <meta name="description" content="We reshape the digital landscape with top-tier digital services and data-driven strategies for unparalleled success. Explore our services and partners." />
      </Helmet>

      <header style={{ position: "sticky", top: '0', zIndex: '3' }}>
        <Navbar />
      </header>

      <section style={{ overflow: 'hidden' }} className={style.home}>

        <div data-aos="fade-right" className={style.left}>

          <Slider
            className={style.slider}
            autoplay={true}
            autoplaySpeed={3000}
            arrows={false}
            fade={true}
          >
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className={style.sliderImage}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div data-aos="fade-left" className={style.right}>
          <h2>
            GROWING DIGITAL
          </h2>
          <h1>
            YOUR GATEWAY TO THE DIGITAL FRONTIER
          </h1>
          <p>
            We've embarked on a journey to reshape the digital landscape, emerging as a beacon of technology-driven excellence. Our steadfast commitment to delivering top-tier digital services and unwavering dedication to our clients set us apart in the dynamic digital world. Our steadfast commitment to pioneering data-informed approaches propels our clients toward unparalleled success.
          </p>
        </div>
      </section>

      <section className={style.home2}>
        <h1>Our Services</h1>
        <hr className={style.line} />

        <div data-aos="fade-up" className={style.box}>
          {services.map((service, index) => (
            <div key={index} className={style[`child${index + 1}`]}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={style.home3}>
        <div data-aos="fade-up" className={style.left}>
          <img className={style.leftimg} src={img} alt="Digital Growth" />
        </div>

        <div data-aos="fade-down" className={style.right}>
          <h6>
            We treat each client as a business partner, your success defines ours.
          </h6>

          <button onClick={() => { navigate('/Service') }} className={style.exploreButton}>
            Explore Our Services
          </button>
          
        </div>
      </section>

      <section className={style.home4}>
        <h1>Our Targeted Audience</h1>
        <hr className={style.line} />

        {cards.map((card, index) => (
          <div className={style.card} key={index}>
            <div className={style.card1}>
              <h2>{card.title}</h2>
            </div>
            <div className={style.card2}>
              <p data-aos="fade">{card.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section style={{ overflow: 'hidden' }} className={style.about}>
        <div data-aos="fade-right" className={style.Mission}>
          <h2>Our Mission</h2>
          <hr className={style.line} />
          <p>
            We empower businesses in the digital age with expert solutions, emphasizing a client-centric approach, innovation, ethical practices, community impact, while maintaining a commitment to measurable results.
          </p>
          <button onClick={() => { navigate('/about') }} className={style.btn2}>
            Read More
          </button>
        </div>


        <div data-aos="fade-left" className={style.Mission}>
          <h2>Our Vision</h2>
          <hr className={style.line} />
          <p>
            We aim to transform businesses into digital success stories through innovation and data-driven strategies, consistently delivering exceptional results, empowering clients to thrive in the digital landscape.
          </p>
          <button onClick={() => { navigate('/about') }} className={style.btn2}>
            Read More
          </button>
        </div>
      </section>

      <section className={style.Partners}>
        <h1>Our Partners</h1>
        <hr className={style.line} />

        <div className={style.scroller}>
          <img className='rounded-md' src={MOw} alt="Partner Logo 1" />
          <img className='rounded-md' src={Microsoft} alt="Partner Logo 2" />
          <img src={Aryan} alt="Partner Logo 3" />
          <img className='rounded-md' src={MOw} alt="Partner Logo 1" />
          <img className='rounded-md' src={Microsoft} alt="Partner Logo 2" />
          <img src={Aryan} alt="Partner Logo 3" />
          <img className='rounded-md' src={MOw} alt="Partner Logo 1" />
          <img className='rounded-md' src={Microsoft} alt="Partner Logo 2" />
          <img src={Aryan} alt="Partner Logo 3" />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home;
