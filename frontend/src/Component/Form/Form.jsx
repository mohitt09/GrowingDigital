import React from 'react';
import style from './Form.module.css'

const Form = () => {
    return (
        <>
            <div className={style.form}>
                <form>
                    <p>
                        Subscribe to our newsletter
                    </p>
                    
                    <input className={style.input} type="text" id="name" name="name" required placeholder='Your Name' />


                    <input className={style.input} type="email" id="email" name="email" required placeholder='Email' />

                    <button className={style.button} type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default Form;
