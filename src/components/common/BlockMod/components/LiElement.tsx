import React from 'react';
import { AttrChoice } from '../BlockModTypes';
import s from '../BlockMod.module.css';
import { AddElement } from './AddElement';

export function LiElement({ id, name, className, disabled, children, typeLi, inputHidden }: {
  typeLi?: string;
  inputHidden: boolean;
  id: string;
  name: string;
  className: string;
  disabled: boolean;
  children?: AttrChoice[] | null;
}) {

  const createSubLi = () => {
    if (children?.length) {
      let map = children.map((item: AttrChoice) => {
        let choices, clsN;
        if (item.choices) {
          choices = item.choices;
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
