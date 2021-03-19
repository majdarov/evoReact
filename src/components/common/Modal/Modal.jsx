import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import FormModalWrapper from './FormModalWrapper';

const modalRoot = document.getElementById('modal-root');

export function Modal(props) {
  const elemDiv = document.createElement('div');
  const children = <FormModalWrapper>{props.children}</FormModalWrapper>

  useEffect(() => {
    modalRoot.appendChild(elemDiv);
    return () => {
      modalRoot.removeChild(elemDiv)
    };
  })
  return ReactDOM.createPortal(children, elemDiv)
}
