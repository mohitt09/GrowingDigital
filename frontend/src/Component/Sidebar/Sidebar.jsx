import React, { useState, useEffect } from "react";
import style from "./Sidebar.module.css";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import LoginModal from '../Login/Login';
import { Helmet } from "react-helmet";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const [submenus, setSubmenus] = useState({
    Recommendations: false,
    News: false,
    Gaming: false,
    Browse: false,
    More: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSubmenu = (menu) => {
    setSubmenus((prev) => {
      const updatedSubmenus = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === menu ? !prev[key] : false;
        return acc;
      }, {});
      return updatedSubmenus;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>

      <div className={`${style.sidebar} ${isSidebarOpen ? style.open : ""}`}>
        {isSidebarOpen && (
          <div className={style.close} onClick={closeSidebar}>
            <ImCross />
          </div>
        )}
        <h2 className={`${style.mainMenu} text-white-100  text-xl`}>
          Growing Digital
        </h2>
        <hr className={style.line} />

        <ul className={style.sidebarMenu}>
          <li className={style.li} onClick={() => navigate('/')}>
            <a href="/" aria-label="Home">Home</a>
          </li>

          <hr className={style.line} />

          <li onClick={() => navigate('/about')}>
            <a href="/about" aria-label="About Us">About Us</a>
          </li>

          <hr className={style.line} />

          <li onClick={() => navigate('/Service')}>
            <a href="/Service" aria-label="Services">Services</a>
          </li>

          <hr className={style.line} />

          <li onClick={() => navigate('/partner')}>
            <a href="/partner" aria-label="Partners">Partners</a>
          </li>

          <hr className={style.line} />

          <li onClick={() => navigate('/blog')}>
            <a href="/blog" aria-label="Our Blog">Our Blog</a>
          </li>

          <hr className={style.line} />

          <li onClick={() => navigate('/contact')}>
            <a href="/contact" aria-label="Contact Us">Contact Us</a>
          </li>

          <hr className={style.line} />

          <li>
            {isLoggedIn ? (
              <div className={style.loginButton} onClick={() => navigate('/blogs')}>Dashboard</div>
            ) : (
              <div className={style.loginButton} onClick={toggleModal}>Login</div>
            )}
          </li>

          <hr className={style.line} />

          {showModal && <LoginModal onClose={toggleModal} />}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
