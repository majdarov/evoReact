import React, { MouseEvent, useState } from 'react';
import s from './BlockMod.module.css';
import { BlockModProps, Attribut } from './BlockModTypes';
import { Attr } from './components/Attr';
import { FieldInput } from './components/FieldInput';
import { addAttrChoices } from './utilites';

export function BlockMod(props: BlockModProps) {

  /**
   * @property attributes - []
   * @function setAttributes - formProduct.formData.attributes -> []
   * @property disabled = formProduct.allow_edit ? false : true)
   */
  let { attributes, setAttributes, disabled } = props;

  const [attrName, setAttrName] = useState('');

  function addAttr(ev: MouseEvent) {
    let attr: Attribut | undefined = addAttrChoices(ev, attrName);
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
              return <Attr key={idx} attr={attr} setAttributes={setAttributes} attributes={attributes} disabled={disabled} />
            })
          }
        </div>
        {/* <li key={'attrIn'} onClick={addAttr} hidden>
          <label htmlFor="Attr">Атрибут</label>
          <input type="text" name={'Attr'} value={attrName} onChange={(ev) => setAttrName(ev.target.value)} />
          <i className='fa fa-plus'></i>
        </li> */}
        <FieldInput
          name='AttrIn'
          value={attrName}
          className='fa fa-plus'
          onClick={addAttr}
          onChange={(ev: any) => setAttrName(ev.target.value)}
        />
        <div key='add_attr' id='add_attr' onClick={addAttr} style={{ cursor: 'pointer' }} hidden={disabled}>
          <strong>
            + Attribut
          </strong>
        </div>
      </ul>
    </div >
  )
}
