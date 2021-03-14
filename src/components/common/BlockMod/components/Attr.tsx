import React, { useState } from 'react';
import s from '../BlockMod.module.css';
import { Attribut, BlockModProps, Choice } from "../BlockModTypes";
import { deleteFromArray, getAttrChoice } from '../utilites';
import { ChoiceElement } from './Choice';
import { FieldInput } from './FieldInput';

type AttrProps = BlockModProps & { attr: Attribut };

export function Attr(props: AttrProps) {

  let { attr, setAttributes, attributes, disabled } = props;

  const [choiceName, setChoiceName] = useState('');
  const [inputHidden, setInputHidden] = useState(true);
  const [choiceId, setChoiceId] = useState('');

  function addChoice() {
    let choice = getAttrChoice(choiceName);
    if (choice) {
      attr.choices?.push(choice);
      setAttributes([...attributes]);
      setChoiceName('');
    }
    setInputHidden(true);
  }

  function toggleHidden() {
    setInputHidden(!inputHidden);
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
                  <ChoiceElement
                    id={choice.id}
                    callback={clickChoiceEdit}
                    choiceId={choiceId}
                    name={choice.name}
                    disabled={disabled}
                  />
                )
              })
            }
          </div>
          <FieldInput
            name='ChoiceIn'
            value={choiceName}
            onChange={(ev: any) => setChoiceName(ev.target.value)}
            onClick={!!choiceId ? renameChoice : addChoice}
            className='fa fa-plus'
            hidden={inputHidden}
          />
          <li key='add_choice' id='add_choice' onClick={toggleHidden}
            style={{ cursor: 'pointer' }} hidden={disabled || !inputHidden}>
            <strong>
              + choice
            </strong>
          </li>
        </ul>
      </li>
    </>
  )
}
