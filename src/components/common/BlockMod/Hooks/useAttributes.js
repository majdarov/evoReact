// @ts-check
import { useState } from 'react';
import { deleteFromArray, getAttrChoice } from '../utilites';

/**
 * augments
 * @param {import('../BlockModTypes').AttrChoice[]} attributes - Attribut[]
 * @param {Function} setAttributes - set
 */
export function useAttributes(attributes, setAttributes) {
  const [inputHidden, setInputHidden] = useState(true);
  const [attrId, setAttrId] = useState('');
  const [id, setId] = useState('');
  const [action, setAction] = useState('')
  const [paramName, setParamName] = useState('');

  /**@type {import('react').EventHandler<ev>}*/
  function changeParamName(ev) {
    setParamName(ev.target.value || '');
  }

  /**@type {import('react').MouseEventHandler<ev>}*/
  function handleClick(ev) {
    ev.stopPropagation();
    let key = action.split('-')[0];
    let typeOfParam = action.split('-')[1];
    if (key === 'add') {
      addParam(typeOfParam, paramName, attrId);
    } else if (key === 'edit') {
      editParam(id, paramName, typeOfParam, attrId);
    }
    setParamName('');
    setId('');
    setAttrId('');
    setAction('');
    toggleHidden();
  }

  /**@type {import('react').EventHandler<ev>} */
  function onBlocModClick(ev) {
    if (ev.target.tagName !== 'I' && ev.target.tagName !== 'STRONG') return;
    let action = ev.target.dataset.action;
    setAction(action)
    let elem = ev.target;
    let attrId = '';
    let id = '';
    let name = '';
    switch (action) {
      case 'edit-choice':
        id = elem.closest('li').id;
        name = elem.closest('li').dataset.name;
        setId(id);
        setParamName(name);
        attrId = elem.closest('ul').closest('li').id;
        setAttrId(attrId);
        break;
      case 'add-choice':
        attrId = elem.closest('li').id;
        setAttrId(attrId);
        break;
      case 'edit-attr':
        id = elem.closest('li').id;
        name = elem.closest('li').dataset.name;
        setId(id);
        setParamName(name);
        break;
      case 'add-attr':
        break;
      default:
        break;
    }
    // console.log(action, `id: ${id}`, `attrId: ${attrId}`);
    toggleHidden();
  }

  /** getAttribut
   * @param {string} _id - id of attribute
   * @returns {import('../BlockModTypes').AttrChoice | undefined}
   */
  function getAttribut(_id) {
    return attributes.find(({ id }) => id === _id);
  }

  /** addParam
   * argument
   * @param {string} typeOfParam - 'attr' | 'choice'
   * @param {string} nameOfParam
   * @param {string} [attrId] - id of attribut
   */
  function addParam(typeOfParam, nameOfParam, attrId) {
    /**
     * @param {{id: string; name: string}} param
     */
    let param = getAttrChoice(nameOfParam);

    if (param) {
      if (typeOfParam === 'attr') {
        setAttributes([...attributes, { ...param, choices: [] }]);
      } else if (typeOfParam === 'choice') {
        if (!attrId) return;
        let attr = getAttribut(attrId);
        attr?.choices?.push(param);
        setAttributes([...attributes]);
      }
    }
    setInputHidden(true);
  }

  /** renameParam
   *arguments
   * @param {string} paramId - attr.id | choice.id
   * @param {string} newName - new name
   * @param {string} typeOfParam - 'attr' | 'choice'
   * @param {string} [attrId] - attr.id
   */
  function editParam(paramId, newName, typeOfParam, attrId) {
    if (!paramId || !newName) return;

    /**@type {import('../BlockModTypes').AttrChoice | undefined}*/
    let attr;
    if (attrId) attr = attributes.find(({ id }) => id === attrId);
    if (typeOfParam === 'choice') {
      if (attr?.choices?.length) {
        let choice = { id: paramId, name: newName };
        deleteFromArray(paramId, attr.choices);
        attr.choices.push(choice);
      }
    } else if (typeOfParam === 'attr') {
      attr = attributes.find((attr) => attr.id === paramId);
      if (attr) attr.name = newName;
    }
    toggleHidden();
    setAttributes([...attributes]);
  }
  function toggleHidden() {
    setInputHidden(!inputHidden);
  }

  return { onBlocModClick, handleClick, changeParamName, nameOfAttr: getAttribut(attrId)?.name , paramName, action, inputHidden };
}
