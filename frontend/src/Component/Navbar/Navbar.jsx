import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from '../Login/Login'; // Import the LoginModal component
import logo from '../../Assets/logo.png';
import Sidebar from '../Sidebar/Sidebar'; // Import the Sidebar component
import { RxHamburgerMenu } from "react-icons/rx";

import style from './Navbar.module.css';

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case '/':
        setActiveIndex(0);
        break;
      case '/about':
        setActiveIndex(1);
        break;
      case '/Service':
        setActiveIndex(2);
        break;
      case '/partner':
        setActiveIndex(3);
        break;
      case '/blog':
        setActiveIndex(4);
        break;
      case '/contact':
        setActiveIndex(5);
        break;
      default:
        setActiveIndex(-1);
        break;
    }
  }, [location.pathname]);

  const handleItemClick = (index) => {
    setActiveIndex(index); // Always set active index on click

    switch (index) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/about');
        break;
      case 2:
        navigate('/Service');
        break;
      case 3:
        navigate('/partner');
        break;
      case 4:
        navigate('/blog');
        break;
      case 5:
        navigate('/contact');
        break;
      default:
        break;
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className={style.nav}>
      <h2 className={style.h2} onClick={() => navigate('/')} aria-label="Home">
        <img className={style.logo} src={logo} alt="Growing Digital logo" />
      </h2>

      <ul className={style.Navlist}>
        <li
          className={activeIndex === 0 ? style.active : ''}
          onClick={() => handleItemClick(0)}
          aria-current={activeIndex === 0 ? 'page' : undefined}
        >
          Home
        </li>
        <li
          className={activeIndex === 1 ? style.active : ''}
          onClick={() => handleItemClick(1)}
          aria-current={activeIndex === 1 ? 'page' : undefined}
        >
          About Us
        </li>
        <li
          className={activeIndex === 2 ? style.active : ''}
          onClick={() => handleItemClick(2)}
          aria-current={activeIndex === 2 ? 'page' : undefined}
        >
          Services
        </li>
        <li
          className={activeIndex === 3 ? style.active : ''}
          onClick={() => handleItemClick(3)}
          aria-current={activeIndex === 3 ? 'page' : undefined}
        >
          Partners
        </li>
        <li
          className={activeIndex === 4 ? style.active : ''}
          onClick={() => handleItemClick(4)}
          aria-current={activeIndex === 4 ? 'page' : undefined}
        >
          Our Blog
        </li>
        <li
          className={activeIndex === 5 ? style.active : ''}
          onClick={() => handleItemClick(5)}
          aria-current={activeIndex === 5 ? 'page' : undefined}
        >
          Contact Us
        </li>
        <li
          className={style.hum}
          onClick={toggleSidebar} // Toggle sidebar on click
          aria-label="Toggle Sidebar"
        >
          <RxHamburgerMenu />
        </li>
        <li>
          {isLoggedIn ? (
            <div className={style.loginButton} onClick={() => navigate('/blogs')}>
              Dashboard
            </div>
          ) : (
            <div className={style.loginButton} onClick={toggleModal}>
              Login
            </div>
          )}
        </li>
      </ul>

      {showModal && <LoginModal onClose={toggleModal} />}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={toggleSidebar} /> {/* Pass sidebar state */}
      <ToastContainer />
    </nav>
  );
}

export default Navbar;
