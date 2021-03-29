import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export function Modal(props) {

  const [children, setChildren] = useState(null);

  useEffect(() => {
    const modalRootChildCount = modalRoot.childElementCount;
    const zIndex = 9000 + modalRootChildCount + 1
    const child =
      <>
        <div className={style['div-cover']} style={{zIndex}}></div>
        <div className={style['div-container']} style={{zIndex: zIndex + 1}}>{props.children}</div>
      </>
    setChildren(child);
    document.body.style.overflow = 'hidden';
    return () => {
      setChildren(null);
      document.body.style.overflow = 'auto';
    }
  }, [props.children])

  return ReactDOM.createPortal(children, modalRoot)
}
