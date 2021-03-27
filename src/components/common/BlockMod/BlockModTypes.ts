import { ChangeEventHandler, MouseEventHandler } from "react";

export interface BlockModProps {
  attributes: AttrChoice[];
  setAttributes: (attributes: AttrChoice[]) => void;
  disabled: boolean;
}
export interface Choice {
  id: string;
  name: string;
}

export interface AttrChoice extends Choice {
  choices?: Choice[];
}

export interface FieldInputProps {
  name: string;
  value: string;
  className: string;
  onChange: ChangeEventHandler;
  onClick: MouseEventHandler;
  hidden?: boolean;
}

export type FormChangeNameProps = {
  value: string;
  label: string;
  nameOfAttr?: string;
  onChange: ChangeEventHandler;
  handleClick: MouseEventHandler;
}
