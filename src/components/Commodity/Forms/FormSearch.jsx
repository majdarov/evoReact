import React, { useState } from "react";
import s from '../Commodity.module.css';

const FormSearch = (props) => {

  const [view, setView] = useState(false);
  const [formData, setFormData] = useState({});

  function changeFormElement(ev) {
    let elem = ev.target;
    setFormData({ ...formData, [elem.name]: elem.value });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log(formData);
  };

  return (
    <>
      <form name='form-search' id={s['form-search']} onSubmit={handleSubmit}>
        <div className={s.search} onClick={props.clearSearch}>
          <label>
            Поиск товара
              <input type="text" name='name' onInput={changeFormElement} />
            <i className='fa fa-times'></i>
          </label>
          <label>Поиск в текущей группе
              <input type="checkbox" name={s['current-pid']} id={props.pid} />
          </label>
          <div className={s['filter-container']}>
            <span className={s.filter} onClick={() => setView(view => !view)}>
              filter
            <i className="fa fa-filter" id={s['icon-filter']} ></i>
            </span>
            <input type="submit" value="Искать" />
          </div>
        </div>
        <fieldset className={!view ? s.hidden : ''} name='fieldset'>
          <div className={s['form-search-date']}>
            <label htmlFor='created_at'>Дата создания
              <input type='date' name='created_at' onChange={changeFormElement} />
            </label>
            <label htmlFor='updated_at'>Дата обновления
              <input type='date' name='updated_at' onChange={changeFormElement} />
            </label>
          </div>
          <div className={s['form-search-price']}>
            <label htmlFor='price'>Цена
              <input name='price' onChange={changeFormElement} />
            </label>
            <label htmlFor='price'>Цена по приходу
              <input name='cost_price' onChange={changeFormElement} />
            </label>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default FormSearch;
