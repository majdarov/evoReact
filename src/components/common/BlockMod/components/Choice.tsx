import React from 'react';
import s from '../BlockMod.module.css';

export function ChoiceElement(props: any) {

  const { id, name, choiceId, disabled, callback } = props;

  return (
    <li id={id} key={id} className={s['choice']}
      onClick={callback} hidden={id === choiceId}>
      <label>{name}</label>
      {!disabled && <i className='fa fa-edit'></i>}
    </li>
  )
}
