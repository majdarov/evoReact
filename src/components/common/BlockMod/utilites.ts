import { getUUID4 } from "../utillites";

export const deleteFromArray = (id: string, arr: any[]) => {
  let i = arr.findIndex(item => item.id === id);
  arr.splice(i, 1);
}

export function addAttrChoices(ev: any, param: string) {
  const parentId = ev.target.parentNode.id;
  if ( parentId === 'add_attr' || parentId === 'add_choice') {
    let elem = ev.target.parentNode;
    elem.previousSibling.hidden = false;
    elem.hidden = true;
    return;
  }
  if (ev.target.tagName !== 'I') return null;
  ev.target.parentNode.hidden = true;
  ev.target.parentNode.nextSibling.hidden = false;
  if (param) {
    let id = getUUID4();
    return { id, name: param };
  }
  return null;
}
