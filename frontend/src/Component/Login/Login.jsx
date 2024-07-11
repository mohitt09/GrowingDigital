import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import logo from '../../Assets/logo.png'

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        { email, password }
      );
      toast.success("Login successful!");
      const { token, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      navigate("/blogs");
      onClose();
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className={style.modalOverlay}>
      <button className={style.closeButton} onClick={onClose}>
        X
      </button>
      <div data-aos="fade-up" className={style.modal}>
        <div className="flex justify-center">
        <img style={{width:'30%'}} src={logo} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a
            className={style.forgotPassword}
            onClick={(e) => {
              e.preventDefault();
              navigate("/password-reset");
            }}
          >
            Lost Password?
          </a>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
