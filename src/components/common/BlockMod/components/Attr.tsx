import React, { useState } from 'react';
import s from '../BlockMod.module.css';
import { Attribut, BlockModProps, Choice } from "../BlockModTypes";
import { useFunctions } from '../Hooks/useFunctions';
import { deleteFromArray, getAttrChoice } from '../utilites';
import { ChoiceElement } from './Choice';
import { FieldInput } from './FieldInput';

type AttrProps = BlockModProps & { attr: Attribut };

export function Attr(props: AttrProps) {

  let { attr, setAttributes, attributes, disabled } = props;

  const [choiceName, setChoiceName] = useState('');
  const [choiceId, setChoiceId] = useState('');

  let { addParam, toggleHidden, inputHidden } = useFunctions(attributes, setAttributes, attr);

  function renameChoice(ev: any) {
    if (ev.target.tagName === 'I') {
      if (attr.choices?.length) {
        deleteFromArray(choiceId, attr.choices);
        attr.choices.push({ id: choiceId, name: choiceName });
      }
      setChoiceId('');
      setChoiceName('');
      toggleHidden();
      setAttributes([...attributes]);
    }
  }

  function clickChoiceEdit(ev: any, id: string, name: string) {
    let elem = ev.target;
    console.log(ev)
    if (elem?.tagName === 'I') {
      setChoiceId(id);
      setChoiceName(name);
      toggleHidden();
    }
  }

  return (
    <>
      <li className={s['attribut']} id={attr.id}>
        <label>{attr.name}</label>
        <ul>
          <div className={s['choices-ul']}>
            {
              !!attr.choices?.length &&
              attr.choices.map((choice: Choice) => {
                return (
                  <ChoiceElement
                    key={choice.id}
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
            onClick={!!choiceId ? renameChoice : () => addParam('choice', choiceName)}
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
