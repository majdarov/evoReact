import React, { useState } from 'react';
import s from './BlockMod.module.css';
import { addAttrChoices } from './utilites';

export function BlockMod({ attributes, setAttributes }) {

  const [attrName, setAttrName] = useState('');

  function addAttr(ev) {
    let attr = addAttrChoices(ev, attrName);
    if (attr) {
      attr.choices = [];
      setAttributes([...attributes, attr]);
      setAttrName('');
    }
  }


  return (
    <div className={s['attributes']}>
      <ul>
        <div className={s['attributes-ul']}>
          {
            !!attributes.length &&
            attributes.map((attr, idx) => {
              return <Attr key={idx} attr={attr} setAttributes={setAttributes} attributes={attributes} />
            })
          }
        </div>
        <li key={'attrIn'} onClick={addAttr} hidden>
          <label htmlFor="Attr">Атрибут</label>
          <input type="text" name={'Attr'} value={attrName} onChange={(ev) => setAttrName(ev.target.value)} />
          <i className='fa fa-plus'></i>
        </li>
        <div key='add_attr' id='add_attr' onClick={addAttr} style={{ cursor: 'pointer' }}>
          <strong>
            + Attribut
          </strong>
        </div>
      </ul>
    </div >
  )
}

function Attr({ attr, setAttributes, attributes }) {
  const [choiceName, setChoiceName] = useState('');

  function addChoice(ev) {
    let choice = addAttrChoices(ev, choiceName)
    if (choice) {
      attr.choices.push(choice);
      setAttributes([...attributes]);
      setChoiceName('');
    }
  }

  return (
    <>
      <li key={attr.id} className={s['attribut']} id={attr.id}>
        <label>{attr.name}</label>
        <ul>
          <div className={s['choices-ul']}>
            {
              !!attr.choices.length &&
              attr.choices.map(choice => {
                return (
                  <li id={choice.id} key={choice.id} className={s['choice']}>
                    <label>{choice.name}</label>
                  </li>
                )
              })
            }
          </div>
          <li key='choiceIn' onClick={addChoice} hidden>
            <label htmlFor="Choice">Значение</label>
            <input type="text" name={'Choice'} value={choiceName} onChange={(ev) => setChoiceName(ev.target.value)} />
            <i className='fa fa-plus'></i>
          </li>
          <li key='add_choice' id='add_choice' onClick={addChoice} style={{ cursor: 'pointer' }}>
            <strong>
              + choice
            </strong>
          </li>
        </ul>
      </li>
    </>
  )
}
