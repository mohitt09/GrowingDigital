import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function Form1() {

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
    const [toast, setToast] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'phone' && !/^\d*$/.test(value)) {
            return;
        }

        setForm({
            ...form,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        if (!form.firstName) newErrors.firstName = 'First name is required';
        if (!form.email) newErrors.email = 'Email address is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email address is invalid';
        if (form.phone && form.phone.length !== 10) newErrors.phone = 'Phone number must be 10 digits';
        if (!form.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Submit the form
            console.log('Form submitted', form);
            // Reset the form
            setForm(initialState);
            setErrors({});
            setToast('Your response has been submitted.');
            setTimeout(() => setToast(''), 3000);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex flex-col flex-1 min-w-[200px] mt-4">
                            <label>First name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className={`border rounded p-2 text-base ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.firstName && <span className="text-red-500 text-sm mt-2">{errors.firstName}</span>}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[200px] mt-4">
                            <label>Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className="border rounded p-2 text-base border-gray-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex flex-col flex-1 min-w-[200px] mt-4">
                            <label>Email address *</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className={`border rounded p-2 text-base ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <span className="text-red-500 text-sm mt-2">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[200px] mt-4">
                            <label>Phone number</label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className={`border rounded p-2 text-base ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.phone && <span className="text-red-500 text-sm mt-2">{errors.phone}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 mt-4">
                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="border rounded p-2 text-base border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-4 mt-4">
                        <label>Message *</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className={`border rounded p-2 text-base resize-vertical min-h-[100px] ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.message && <span className="text-red-500 text-sm mt-2">{errors.message}</span>}
                    </div>
                    <button className="py-3 px-6 mt-4 bg-green-500 text-white rounded hover:bg-green-600" type="submit">
                        Submit
                    </button>
                </div>
            </form>
            {toast && <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-b-md z-50">{toast}</div>}
        </>
    );
}

export default Form1;
