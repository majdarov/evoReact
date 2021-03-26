import React from 'react';
import { Attribut, Choice } from '../BlockModTypes';
import s from '../BlockMod.module.css';
import { AddElement } from './AddElement';

export function LiElement(props: {
  typeLi?: string;
  inputHidden: boolean;
  id: string;
  name: string;
  className: string;
  disabled: boolean;
  children?: Choice[] | Attribut[] | null;
}) {

  const { id, name, className, disabled, children, typeLi, inputHidden } = props;

  const createSubLi = () => {
    if (children?.length) {
      let map = children.map((item: Choice | Attribut) => {
        let choices, clsN;
        if ((item as Attribut).choices) {
          choices = (item as Attribut).choices;
          clsN = s['attribut'];
        } else {
          choices = null;
          clsN = s['choice'];
        }
        return (
          <LiElement
            key={item.id}
            id={item.id}
            name={item.name}
            children={choices}
            className={clsN}
            disabled={disabled}
            typeLi={typeLi === 'attr' ? 'choice' : 'attr'}
            inputHidden={inputHidden}
          />
        )
      })
      return map;
    }
    return;
  }

  return (
    <li id={id} data-name={name} className={className}>
      <label>{name}</label>
      {!disabled && <i data-action={`edit-${typeLi}`} className='fa fa-edit'></i>}
      <ul className={s['choices-ul']}>
        {createSubLi()}
        {typeLi === 'attr' && !disabled && inputHidden &&
          <AddElement
            key='add-choice'
            action='add'
            typeElem='choice'
            label='Значение'
          />
        }
      </ul>
    </li>
  )
}
