import React from "react";
import s from './Form.module.css';

const FormImg = ({photo}) => {

  return (
    <>
      <img className={s['big-img']}
        src={photo}
        alt="no" tabIndex='-1'
        style={{display: 'inline-block', width: '100vh',
               position: 'fixed', top: '10vh', left: 'calc((100vw - 100vh)/2)',
               verticalAlign: 'middle'}}
      /><span></span>
    </>
  );
}

export default FormImg;
