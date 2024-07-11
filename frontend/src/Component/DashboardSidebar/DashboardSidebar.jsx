import React, { useState, useEffect } from "react";
import styles from "./DashboardSidebar.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { FaRegUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { FaHome, FaUsers, FaBlog, FaEdit } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import admin from "../../Assets/admin-icon.png";
import logo from '../../Assets/logo.png';

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        navigate("/");
        toast.error("Unauthorized access. Redirecting to homepage.");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!userId || !token) return;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 403) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/");
        } else if (!response.ok) {
          throw new Error("Failed to fetch user details");
        } else {
          const data = await response.json();
          if (isMounted) {
            setUserDetails(data);
          }
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Failed to fetch user details");
        }
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedDetails) => {
    setUserDetails((prevDetails) => ({ ...prevDetails, ...updatedDetails }));
    // Add code to save updated details to the backend
  };

  return (
    <>
      <div className={styles.sidebar}>
        {/* First occurrence of the logo part */}
        <div className={styles.logo} onClick={handleLogoClick}>
          <img style={{ width: '20%' }} src={logo} alt="" />
        </div>

        <div className={styles.iconsContainer}>
          <FontAwesomeIcon
            onClick={() => {
              navigate("/");
            }}
            icon={FaHome}
            className={styles.icon}
          />
          <FontAwesomeIcon icon={FaRegUser} className={styles.icon} />
          <FontAwesomeIcon
            icon={FiLogOut}
            className={styles.icon}
            onClick={handleLogout}
          />
        </div>
      </div>

      <div>
        <nav className={styles.nav}>
          <div>
            <li onClick={toggleSidebar}>
              <GiHamburgerMenu className={styles.hamburgerIcon} />
            </li>
          </div>

          <ul>
            <li style={{ position: "relative" }}>
              <FaRegUser style={{ color: "#686868" }} />
              <div className={styles.Admin}>
                
                {userDetails && (
                  <>
                    <div className={styles.userDetails}>
                      <img
                        src={admin}
                        alt={admin}
                        className={styles.profilePicture}
                      />
                      <p className={styles.email}>{userDetails.email}</p>
                    </div>
                    <hr />
                    <p className={styles.options} onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </p>
                    {/* <p className={styles.options} onClick={handleEditProfile}>
                      <FaEdit /> Edit Profile
                    </p> */}
                  </>
                )}
              </div>
            </li>
          </ul>
        </nav>

        <div
          className={`${styles.sidebar2} ${isSidebarOpen ? styles.open : ""}`}
        >
          {isSidebarOpen && (
            <div className={styles.close} onClick={closeSidebar}>
              <ImCross />
            </div>
          )}

          <div className={styles.mainbox}>

            <div className={styles.logo2} onClick={handleLogoClick}>
              <img className="w-[40%] mt-[2em]" src={logo} alt="" />
            </div>

            <ul>
              <li
                onClick={() => {
                  navigate("/blogs");
                }}
              >
                <FaBlog /> Blogs
              </li>
              <li
                onClick={() => {
                  navigate("/contact-details");
                }}
              >
                <TbCategoryFilled /> Contact Details
              </li>
              <li
                onClick={() => {
                  navigate("/upload");
                }}
              >
                <TbCategoryFilled /> Upload Blog
              </li>
            </ul>
          </div>
        </div>

        {isSidebarOpen && (
          <div className={styles.overlay} onClick={closeSidebar}></div>
        )}
      </div>

      <section className={styles.leftcontainer}>

        <div className={styles.logo} onClick={handleLogoClick}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles.logo} onClick={handleLogoClick}></div>

        <ul>
          <li
            onClick={() => {
              navigate("/blogs");
            }}
          >
            <FaBlog /> Blogs
          </li>
          <li
            onClick={() => {
              navigate("/contact-details");
            }}
          >
            <TbCategoryFilled /> Contact Details
          </li>
          
          <li
            onClick={() => {
              navigate("/upload");
            }}
          >
            <TbCategoryFilled /> Upload Blog
          </li>
        </ul>
      </section >
    </>
  );
};

export default DashboardSidebar;
