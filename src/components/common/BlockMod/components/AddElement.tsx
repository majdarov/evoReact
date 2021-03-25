import React from 'react';

export function AddElement(props: {
  action: string;
  typeElem: string;
  label: string;
}) {

  const { action, typeElem, label } = props;

  return (
    <div style={{ cursor: 'pointer' }}>
      <strong data-action={`${action}-${typeElem}`}>
        + {label}
      </strong>
    </div>)
}
