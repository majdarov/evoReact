// import { MouseEvent } from 'react';
import { getUUID4 } from '../utillites';

export const deleteFromArray = (id: string, arr: any[]) => {
  let i = arr.findIndex((item) => item.id === id);
  arr.splice(i, 1);
};

export function getAttrChoice(name: string) {
  if (!name) return;
  return { id: getUUID4(), name };
}
