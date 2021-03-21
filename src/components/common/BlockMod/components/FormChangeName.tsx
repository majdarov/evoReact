import { FormChangeNameProps } from "../BlockModTypes";
import s from '../BlockMod.module.css';

export function FormChangeName(props: FormChangeNameProps) {

  let { value, label, onChange, handleClick } = props;

  return (
    <>
      <div data-name='form-change-name' className={s['form-change-name']}>
        <label htmlFor='input-name'>{label}</label>
        <input type="text" name='input-name' value={value} onChange={onChange} autoFocus/>
        <i className='fa fa-plus' onClick={handleClick}></i>
      </div>
    </>
  )
}
