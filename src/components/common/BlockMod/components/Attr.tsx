import React, { MouseEvent, useState } from 'react';
import s from '../BlockMod.module.css';
import { Attribut, BlockModProps, Choice } from "../BlockModTypes";
import { addAttrChoices, deleteFromArray } from '../utilites';
import { FieldInput } from './FieldInput';

/**
 * @property AttrProps - аттрибут/модификация группы
 */

interface AttrProps extends BlockModProps {
  attr: Attribut;
}

export function Attr(props: AttrProps) {

  let { attr, setAttributes, attributes, disabled } = props;

  const [choiceName, setChoiceName] = useState('');
  const [inputHidden, setInputHidden] = useState(true);
  const [choiceId, setChoiceId] = useState('');

  function addChoice(ev: MouseEvent) {
    let choice: Choice | undefined = addAttrChoices(ev, choiceName)
    if (choice) {
      attr.choices?.push(choice);
      setAttributes([...attributes]);
      setChoiceName('');
    }
  }

  function renameChoice(ev: any) {
    if (ev.target.tagName === 'I') {
      if (attr.choices?.length) {
        deleteFromArray(choiceId, attr.choices);
        attr.choices.push({ id: choiceId, name: choiceName });
      }
      setChoiceId('');
      setChoiceName('');
      setInputHidden(true);
      setAttributes([...attributes]);
    }
  }

  function clickChoiceEdit(ev: any) {
    if (ev.target.tagName === 'I') {
      let _id = ev.target.closest('li').id;
      setChoiceId(_id);
      setInputHidden(false);
    }
  }

  return (
    <>
      <li key={attr.id} className={s['attribut']} id={attr.id}>
        <label>{attr.name}</label>
        <ul>
          <div className={s['choices-ul']}>
            {
              !!attr.choices?.length &&
              attr.choices.map((choice: Choice) => {
                return (
                  <li id={choice.id} key={choice.id} className={s['choice']}
                    onClick={clickChoiceEdit} hidden={choice.id === choiceId}>
                    <label>{choice.name}</label>
                    {!disabled && <i className='fa fa-edit'></i>}
                  </li>
                )
              })
            }
          </div>
          <FieldInput
            hidden={inputHidden}
            name='ChoiceIn'
            value={choiceName}
            onChange={(ev: any) => setChoiceName(ev.target.value)}
            onClick={!!choiceId ? renameChoice : addChoice}
            className='fa fa-plus'
          />
          <li key='add_choice' id='add_choice' onClick={addChoice} style={{ cursor: 'pointer' }} hidden={disabled || !inputHidden}>
            <strong>
              + choice
            </strong>
          </li>
        </ul>
      </li>
    </>
  )
}
