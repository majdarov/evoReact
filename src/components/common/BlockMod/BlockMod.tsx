import React, { useState } from 'react';
import s from './BlockMod.module.css';
import { BlockModProps, Attribut } from './BlockModTypes';
import { Attr } from './components/Attr';
import { FieldInput } from './components/FieldInput';
import { useFunctions } from './Hooks/useFunctions';

export function BlockMod(props: BlockModProps) {

  let { attributes, setAttributes, disabled } = props;

  let { addParam, toggleHidden, inputHidden } = useFunctions(attributes, setAttributes);

  const [attrName, setAttrName] = useState('');

  return (
    <div className={s['attributes']}>
      <ul>
        <div className={s['attributes-ul']}>
          {
            !!attributes.length &&
            attributes.map((attr: Attribut, idx) => {
              return <Attr key={attr.id} attr={attr} {...props} />
            })
          }
        </div>
        <FieldInput
          name='AttrIn'
          value={attrName}
          className='fa fa-plus'
          onClick={() => addParam('attr', attrName)}
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
