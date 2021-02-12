import React from "react";
import s from '../Commodity.module.css';

const FormSearch = () => {

  return (
    <div className={s['form-search']}>
      <form id={s['form-search']} >
        <label htmlFor='created_at'>Дата создания
      <input type='date' name='created_at' />
        </label>
        <label htmlFor='updated_at'>Дата обновления
      <input type='date' name='updated_at' />
        </label>
      </form>
    </div>
  );
}

export default FormSearch;
