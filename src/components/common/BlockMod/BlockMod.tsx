import React from 'react';
import { Modal } from '../Modal/Modal';
import s from './BlockMod.module.css';
import { AttrChoice, BlockModProps } from './BlockModTypes';
import { AddElement } from './components/AddElement';
import { FormChangeName } from './components/FormChangeName';
import { LiElement } from './components/LiElement';
import { useAttributes } from './Hooks/useAttributes';

export function BlockMod(props: BlockModProps) {

  let { attributes, setAttributes, disabled } = props;
  let { onBlocModClick, handleClick, changeParamName, nameOfAttr, paramName, action, inputHidden } = useAttributes(attributes, setAttributes);

  return (
    <div className={s['attributes']} onClick={onBlocModClick}>
      {!inputHidden &&
        <Modal>
          <FormChangeName
            nameOfAttr={nameOfAttr || ''}
            label={action.split('-')[1] === 'attr' ? 'Аттрибут' : 'Значение'}
            value={paramName}
            onChange={changeParamName}
            handleClick={handleClick}
          />
        </Modal>
      }
      <ul className={s['attributes-ul']}>
        {
          !!attributes.length &&
          attributes.map((attr: AttrChoice, idx) => {
            return <LiElement
              key={attr.id}
              typeLi='attr'
              inputHidden={inputHidden}
              id={attr.id}
              name={attr.name}
              className={s['attribut']}
              disabled={disabled}
              children={attr.choices}
            />
          })
        }
        {(!disabled && inputHidden) &&
          <AddElement
            key='add-attr'
            action='add'
            typeElem='attr'
            label='Аттрибут'
          />}
      </ul>
    </div >
  )
}
