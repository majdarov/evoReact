import { ChangeEventHandler, MouseEventHandler } from "react";

export interface BlockModProps {
  attributes: Attribut[];
  setAttributes: (attributes: Attribut[]) => void;
  disabled: boolean;
}
export type Attribut = {
  id: string;
  name: string;
  choices?: Choice[];
}

export type Choice = {
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

export type FormChangeNameProps = {
  value: string;
  label: string
  onChange: (ev: any) => void;
  handleClick: MouseEventHandler;
}
