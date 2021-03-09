import { useCallback, useState } from 'react';
import { apiIDB } from '../../../../api/apiIDB';

/* const attr = [
  {
    id: 'be30db90-514f-11e9-91c7-4b1dd1e1bcf8',
    name: 'Цвет',
    choices: [
      {
        id: 'be30db91-514f-11e9-91c7-4b1dd1e1bcf8',
        name: 'Красный',
      },
      {
        id: 'be30db92-514f-11e9-91c7-4b1dd1e1bcf8',
        name: 'Зеленый',
      },
      {
        id: 'be30db93-514f-11e9-91c7-4b1dd1e1bcf8',
        name: 'Синий',
      },
    ],
  },
  {
    id: 'be30db94-514f-11e9-91c7-4b1dd1e1bcf8',
    name: 'Размер',
    choices: [
      {
        id: 'be3102a0-514f-11e9-91c7-4b1dd1e1bcf8',
        name: 'S',
      },
      {
        id: 'be3102a1-514f-11e9-91c7-4b1dd1e1bcf8',
        name: 'M',
      },
      {
        id: 'be3102a2-514f-11e9-91c7-4b1dd1e1bcf8',
        name: 'L',
      },
    ],
  },
]; */

export const useModifications = (parentId) => {
  const [attributesP, setAttributes] = useState(null);
  // console.log('render: ', attributesP?.length || null, parentId);

  const getAttributes = useCallback(({ parentId }) =>  {
    if (parentId === '0' || !parentId) return;
    apiIDB.getGroup(parentId).then((g) => setAttributes(g.attributes || null));
  }, [])
  getAttributes({ parentId });

  return { attributesP, getAttributes };
};
