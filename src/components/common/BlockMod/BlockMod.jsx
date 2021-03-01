import React, { useEffect, useState } from 'react';
import { getUUID4 } from '../utillites';
import s from './BlockMod.module.css';
import { deleteFromArray } from './utilites';

export function BlockMod(props) {

  const [attributes, setAttributes] = useState(props.attributes || []);
  const [attrName, setAttrName] = useState('');

  function addAttr(ev) {
    if (ev.target.parentNode.id === 'add_attr') {
      let elem = ev.target.parentNode;
      elem.previousSibling.hidden = false;
      elem.hidden = true;
      return;
    }
    if (ev.target.tagName !== 'I') return;
    if (attrName) {
      let id = getUUID4();
      setAttributes([...attributes, { id, name: attrName, choices: [] }]);
      setAttrName('');
    }
    ev.target.parentNode.hidden = true;
    ev.target.parentNode.nextSibling.hidden = false;
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
  const [newAttr, setNewAttr] = useState({ ...attr });
  const [choices, setChoices] = useState(attr.choices);
  const [choiceName, setChoiceName] = useState('');

  function addChoice(ev) {
    if (ev.target.parentNode.id === 'add_choice') {
      let elem = ev.target.parentNode;
      elem.previousSibling.hidden = false;
      elem.hidden = true;
      return;
    }
    if (ev.target.tagName !== 'I') return;
    if (choiceName) {
      let id = getUUID4();
      setChoices([...choices, { id, name: choiceName }]);
      deleteFromArray(newAttr.id, attributes);
      setChoiceName('');
    }
    ev.target.parentNode.hidden = true;
    ev.target.parentNode.nextSibling.hidden = false;
  }

  useEffect(() => {
    setNewAttr({ ...attr, choices });
  }, [attr, choices])

  const choicesJsx = !!choices.length &&
    choices.map(choice => {
      return (
        <li id={choice.id} key={choice.id} className={s['choice']}>
          <label>{choice.name}</label>
        </li>
      )
    })

  return (
    <>
      <li key={attr.id} className={s['attribut']} id={attr.id}>
        <label>{attr.name}</label>
        <ul>
          <div className={s['choices-ul']}>
            {choicesJsx}
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
