import React, { useLayoutEffect } from "react";
import s from './FormModalWrapper.module.css';

const FormModalWrapper = props => {

  const showForm = () => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      // let coverDiv = document.getElementById(s['cover-div']);
      // coverDiv.style.zIndex = 9000 + props.lvl;
      let container = document.getElementById(s['container']);
      // container.style.zIndex = Number(coverDiv.style.zIndex) + 1;
      container.style.top = '1rem'
    }, 0);
  }

  useLayoutEffect(showForm, []);

  return (
    <>
      <div id={s['cover-div']}></div>
      <div className={s.container} id={s.container}>
        {props.children}
      </div>
    </>
  );
}



export default FormModalWrapper;
