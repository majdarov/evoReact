// @ts-check
import { useState } from 'react';
import { getAttrChoice } from '../utilites';

/**
 * augments
 * @param {import('../BlockModTypes').Attribut[]} attributes - Attribute[]
 * @param {Function} setAttributes - set
 * @param {import('../BlockModTypes').Attribut} [attr]
 */
export function useFunctions(attributes, setAttributes, attr) {
  const [inputHidden, setInputHidden] = useState(true);

  /**
   * argument
   * @param {string} typeOfParam - 'attr' | 'choice'
   * @param {string} nameOfParam
   */
  function addParam(typeOfParam, nameOfParam) {

    /**
     * @param {{id: string; name: string}} param
     */
    let param = getAttrChoice(nameOfParam);

    if (param) {
      if (typeOfParam === 'attr') {
        setAttributes([...attributes, {...param, choices: []}]);
      } else if (typeOfParam === 'choice') {
        if (!attr) return;
        attr.choices?.push(param);
        setAttributes([...attributes])
      }
    }
    setInputHidden(true);
  }

  /**
   *
   * @param {Event} ev
   */
  function renameChoice(ev) {
    // TODO
    // if (ev.target.tagName === 'I') {
    //   if (attr.choices?.length) {
    //     deleteFromArray(choiceId, attr.choices);
    //     attr.choices.push({ id: choiceId, name: choiceName });
    //   }
    //   setChoiceId('');
    //   setChoiceName('');
    //   toggleHidden();
    //   setAttributes([...attributes]);
    // }
  }

  function toggleHidden() {
    setInputHidden(!inputHidden);
  }

  return { addParam, toggleHidden, inputHidden }
}
