import { FieldInputProps } from "../BlockModTypes";

export function FieldInput(props: FieldInputProps) {

  let { name, value, className, onChange, onClick, hidden } = props;

  const liHidden = hidden === undefined ? true : hidden;

  return (
    <li key={name}  hidden={liHidden}>
      <label htmlFor={name}>Значение</label>
      <input type="text" name={name} value={value} onChange={onChange} />
      <i className={className} onClick={onClick}></i>
    </li>
  )
}
