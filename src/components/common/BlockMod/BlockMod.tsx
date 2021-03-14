import React, { useState } from 'react';
import s from './BlockMod.module.css';
import { BlockModProps, Attribut } from './BlockModTypes';
import { Attr } from './components/Attr';
import { FieldInput } from './components/FieldInput';
import { getAttrChoice } from './utilites';

export function BlockMod(props: BlockModProps) {

  let { attributes, setAttributes, disabled } = props;

  const [attrName, setAttrName] = useState('');
  const [inputHidden, setInputHidden] = useState(true);

  function addAttr() {
    let attr: Attribut | undefined = getAttrChoice(attrName);
    if (attr) {
      attr.choices = [];
      setAttributes([...attributes, attr]);
      setAttrName('');
    }
    setInputHidden(true);
  }

  function toggleHidden() {
    setInputHidden(!inputHidden);
  }

  return (
    <div className={s['attributes']}>
      <ul>
        <div className={s['attributes-ul']}>
          {
            !!attributes.length &&
            attributes.map((attr: Attribut, idx) => {
              return <Attr key={idx} attr={attr} setAttributes={setAttributes} attributes={attributes} disabled={disabled} />
            })
          }
        </div>
        <FieldInput
          name='AttrIn'
          value={attrName}
          className='fa fa-plus'
          onClick={addAttr}
          onChange={(ev: any) => setAttrName(ev.target.value)}
          hidden={inputHidden}
        />
        <div key='add_attr' id='add_attr' onClick={toggleHidden}
          style={{ cursor: 'pointer' }} hidden={disabled || !inputHidden}>
          <strong>
            + Attribut
          </strong>
        </div>
      </ul>
    </div >
  )
}
