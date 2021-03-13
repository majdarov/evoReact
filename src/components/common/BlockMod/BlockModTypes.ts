import { ChangeEventHandler, MouseEventHandler } from "react";

export interface BlockModProps {
  attributes: Attribut[];
  setAttributes: Function;
  disabled: boolean;
}

export interface Attribut {
  id: string;
  name: string;
  choices?: Choice[];
}

export interface Choice {
  id: string;
  name: string;
}

export interface FieldInputProps {
  name: string;
  value: string;
  className: string;
  onChange: ChangeEventHandler;
  onClick: MouseEventHandler;
  hidden?: boolean;
}
