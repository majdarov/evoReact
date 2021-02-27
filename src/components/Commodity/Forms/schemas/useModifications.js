import React, { useState } from 'react';
import { apiForIdb } from '../../../../api/api';
import { apiIDB } from '../../../../api/apiIDB';

export const useModifications = ({ isGroup, groupId, parentId }) => {
  const [attributes, setAttributes] = useState(null);

  if (!isGroup) {
    apiIDB.getGroup(parentId).then(g => setAttributes(g.attributes || null));
  }

  return attributes;
};

const attributes = [
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
];
