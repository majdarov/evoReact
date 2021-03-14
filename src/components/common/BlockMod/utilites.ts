// import { MouseEvent } from 'react';
import { getUUID4 } from '../utillites';

export const deleteFromArray = (id: string, arr: any[]) => {
  let i = arr.findIndex((item) => item.id === id);
  arr.splice(i, 1);
};

// export function chooseHiddenInput({ target }) {}
/*
export function addAttrChoices(ev: MouseEvent, param: string) {
  const parentId = ev.currentTarget.parentElement?.id;
  let elem: HTMLElement | null = ev.currentTarget.parentElement;
  if (parentId === 'add_attr' || parentId === 'add_choice') {
    if (elem && elem.previousElementSibling) {
      let _elem: HTMLElement = elem.previousElementSibling;
      _elem.hidden = false;
      elem.hidden = true;
    }
  }
  if (ev.currentTarget.tagName === 'I') {
    if (elem) {
      elem.hidden = true;
      let elem_: HTMLElement | null = elem.nextSibling;
      if (elem_) elem_.hidden = false;
    }
    if (param) {
      let id: string = getUUID4();
      return { id, name: param };
    }
  }
}
*/

export function getAttrChoice(name: string) {
  return { id: getUUID4(), name };
}
