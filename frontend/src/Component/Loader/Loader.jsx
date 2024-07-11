import React from 'react';
import style from './Loader.module.css';

function Loader() {
    return (
        <div style={{height:'100vh',alignItems:'center',background:'black'}} className='flex  w-[100%] h-[100%] justify-center item-center'>
            <div className={style.loader}>Loading...</div>
        </div>
    );
}

export default Loader;
