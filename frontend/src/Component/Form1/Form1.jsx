import React, { useState, useEffect } from 'react';
import style from './Form1.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Aos from "aos";
import "aos/dist/aos.css";
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';

function Form1() {

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [captchaValid, setCaptchaValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone' && !/^\d*$/.test(value)) {
            return;
        }

        if (name === 'message' && value.length > 100) {
            setErrors({ ...errors, message: 'Message should be within 100 characters' });
            return;
        }

        setForm({
            ...form,
            [name]: value
        });

        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        let newErrors = {};
        if (!form.firstName) newErrors.firstName = 'First name is required';
        if (!form.email) newErrors.email = 'Email address is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email address is invalid';
        if (!form.phone) newErrors.phone = 'Phone number is required';
        else if (form.phone.length !== 10) newErrors.phone = 'Phone number must be 10 digits';
        if (!form.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValid(!!value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error(Object.values(validationErrors).join('. '));
        } else if (!captchaValid) {
            toast.error('Please complete the CAPTCHA');
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, form);
                console.log('Form submitted', response.data);
                setForm(initialState);
                setErrors({});
                toast.success('Your response has been submitted.');
            } catch (error) {
                console.error('There was an error submitting the form!', error);
                const serverErrors = error.response?.data?.errors || [{ msg: 'Server error. Please try again later.' }];
                toast.error(serverErrors.map(err => err.msg).join('. '));
            }
        }
    };

    return (
        <>
            <Helmet>
                <meta name="description" content="Fill out the form to get in touch with us. Provide your first name, last name, email address, phone number, and message." />
            </Helmet>

            <form data-aos="fade-up" onSubmit={handleSubmit}>
                <div className={style.Form1}>
                    <div className={style.inputGroup}>
                        <div className={style.formGroup}>
                            <label>First name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                aria-required="true"
                                aria-invalid={errors.firstName ? "true" : "false"}
                                className={errors.firstName ? style.errorInput : ''}
                            />
                            {errors.firstName && <span className={style.error}>{errors.firstName}</span>}
                        </div>
                        <div className={style.formGroup}>
                            <label>Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={style.inputGroup}>
                        <div className={style.formGroup}>
                            <label>Email address *</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className={errors.email ? style.errorInput : ''}
                                aria-required="true"
                                aria-invalid={errors.email ? "true" : "false"}
                            />

                            {errors.email && <span className={style.error}>{errors.email}</span>}

                        </div>
                        <div className={style.formGroup}>
                            <label>Phone number *</label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className={errors.phone ? style.errorInput : ''}
                                aria-required="true"
                                aria-invalid={errors.phone ? "true" : "false"}
                            />
                            {errors.phone && <span className={style.error}>{errors.phone}</span>}
                        </div>
                    </div>

                    <div className={style.formGroup}>
                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label>Message *</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className={errors.message ? style.errorInput : ''}
                            aria-required="true"
                            aria-invalid={errors.message ? "true" : "false"}
                        />
                        {errors.message && <span className={style.error}>{errors.message}</span>}
                    </div>

                    <div className="flex flex-col mt-4">
                        <ReCAPTCHA
                            sitekey="6LeDRQgqAAAAAD8upWIOJmfKW8g83zqwA2EaE1CO"
                            onChange={handleCaptchaChange}
                        />
                    </div>

                    <button className={style.submit} type="submit">
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}

export default Form1;
