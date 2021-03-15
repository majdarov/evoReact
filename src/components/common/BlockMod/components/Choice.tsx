import React from 'react';
import s from '../BlockMod.module.css';

export function ChoiceElement(props: any) {

  const { id, name, choiceId, disabled, callback } = props;
  function editChoice(ev: any) {
    callback(ev, id, name);
  }

  return (
    <li id={id} className={s['choice']}
      onClick={editChoice} hidden={id === choiceId}>
      <label>{name}</label>
      {!disabled && <i className='fa fa-edit'></i>}
    </li>
  )
}
