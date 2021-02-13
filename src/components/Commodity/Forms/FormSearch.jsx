import React, { useEffect, useState } from "react";
import s from '../Commodity.module.css';

const FormSearch = (props) => {

  const [view, setView] = useState(false);
  const [formData, setFormData] = useState({});
  const [pid, setPid] = useState(props.parent_id);

  useEffect(() => setPid(props.parent_id), [props.parent_id])

  function changeFormElement(ev) {
    let elem = ev.target;
    setFormData({ ...formData, [elem.name]: elem.value });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let chk = document.forms['form-search']['current-pid'];
    let obj = { ...formData };

    if (!Object.keys(obj).length || chk.checked) {
      obj.parent_id = pid || '0';
    }

    Object.keys(obj).forEach(key => {
      if (obj[key === '']) delete obj[key];
      if (key.match(/price/gi)) obj[key] = Number(obj[key]);
      if (key.match(/_at/gi)) {
        obj[key] = Date.parse(obj[key]);
      }
    })
    console.log('obj', obj)
    props.searchProducts(obj);
  };

  function clearSearch(e) {
    if (e.target.tagName !== 'I') return;
    let form = document.forms['form-search'];
    Array.from(form.elements).forEach(elem => {
      if (elem.tagName === 'INPUT') {
        elem.value = '';
      }
    })
    // console.log(form.elements)
    // e.target.closest('div').querySelector('input').value = '';
    setFormData({});
    props.returnBeforeSearch();
  }

  return (
    <>
      <form name='form-search' id={s['form-search']} onSubmit={handleSubmit}>
        <div className={s.search} onClick={clearSearch}>
          <label htmlFor='name'>Поиск товара
              <input type="text" name='name' onInput={changeFormElement} />
            <i className='fa fa-times'></i>
          </label>
          <label>Поиск в текущей группе
              <input type="checkbox" name='current-pid' className={s['current-pid']} id={props.pid} />
          </label>
          <div className={s['filter-button']}>
            <span className={s.filter} onClick={() => setView(view => !view)}>
              filter
            <i className="fa fa-filter" id={s['icon-filter']} ></i>
            </span>
          </div>
          <div className={s['filter-button']}>
            <span className={s.filter} onClick={handleSubmit}>
              Искать
            <i className="fa fa-filter" id={s['icon-filter']} ></i>
              <input type="submit" value="Искать" className={s.hidden} />
            </span>
          </div>
        </div>
        <fieldset className={!view ? s.hidden : ''}>
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
