import React, { useCallback, useEffect, useState } from "react";
import ComponentsSearch from './schemas/ComponentsSearch';
import s from './FormSearch.module.css';

// const log = console.log;

const initialPeriod = {
  created_at: false,
  updated_at: false,
  price: false,
  cost_price: false,
}

function createRequestObj(formData, name, period, callback) {
  let chk = document.forms['form-search']['current-pid'];
  let obj = { ...formData };

  if (!chk.checked) {
    delete obj.parent_id;
  }

  Object.keys(obj).forEach(key => {
    if (!obj[key] || !obj[key].length) delete obj[key];
    if (period[key] && obj[key].length === 1) obj[key][1] = null;
  })

  if (name.length) obj.name = name;
  callback(obj);
}

const FormSearch = (props) => {

  const [view, setView] = useState(false);
  const [formData, setFormData] = useState({});
  const [pid, setPid] = useState(props.parent_id);
  const [period, setPeriod] = useState(initialPeriod);
  const [name, setName] = useState('');

  const propsSearchProducts = props.searchProducts;
  const searchProducts = useCallback((obj) => {
    propsSearchProducts(obj)
  }, [propsSearchProducts])



  useEffect(() => setPid(props.parent_id), [props.parent_id])

  function changeFormElement(ev) {
    let elem = ev.target;
    let [name, idxName] = elem.name.split('-');
    let value = formData[name];

    if (idxName) {
      let idx;
      switch (idxName) {
        case 'from':
          idx = 0;
          break;
        case 'to':
          idx = 1;
          break;
        default:
          idx = 0;
          break;

      }
      let elemValue = elem.value;
      if (ev.target.type === 'date') elemValue = Date.parse(elemValue);
      if (ev.target.type === 'number') elemValue = Number(elemValue);
      if (!value) {
        value = [];
        idx === 0 ? value = [elemValue] : value = [null, elemValue];
      } else {
        value[idx] = elemValue ? elemValue : null;
      }
    }
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    if (name.length > 3) {
      createRequestObj(formData, name, period, searchProducts);
    }
  }, [formData, name, period])

  function selectParentID(ev) {
    let chk = ev.target.checked;
    if (chk) {
      setFormData({ ...formData, parent_id: pid || '0' });
    }
    createRequestObj(formData, name, period, searchProducts);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    createRequestObj(formData, name, period, searchProducts);
  };

  function clearSearch(ev) {
    // if (ev.target.tagName !== 'I') return;
    let form = document.forms['form-search'];
    Array.from(form.elements).forEach(elem => {
      if (elem.tagName === 'INPUT') {
        if (elem.type === 'checkbox') {
          elem.checked = false;
        } else {
          elem.value = '';
        }
      }
    })
    // console.log(form.elements)
    // e.target.closest('div').querySelector('input').value = '';
    setFormData({});
    setName('');
    setPeriod(initialPeriod);
    setView(false);
    props.returnBeforeSearch();
  }

  function changePeriod(ev) {
    let name = (ev.target.name).split('-')[0];
    let checked = ev.target.checked;
    setPeriod({ ...period, [name]: checked });
    if (!checked) {
      if (!formData[name]) return;
      let arr = [formData[name][0]];
      setFormData({ ...formData, [name]: arr })
    }
  }

  return (
    <div className={s['form-container']}>
      <span className='fa'>Поиск</span>
      <form name='form-search' id={s['form-search']} onSubmit={handleSubmit}>
        <div className={s.search}>
          <div className={s['form-search-row']}>
            <ComponentsSearch.Button
              label='Очистить фильтр'
              icon='fa fa-times'
              callback={clearSearch}
            />
            <div className={s['search-name']}>
              <label htmlFor='name'>Поиск</label>
              <input type="text" name='name' value={name} onChange={(ev) => setName(ev.target.value)} />
            </div>
            <label>В текущей группе</label>
            <input type="checkbox" name='current-pid' onChange={selectParentID}
              className={s['current-pid']} id={props.pid} />
          </div>
          <ComponentsSearch.Button
            label='Расширенный фильтр'
            icon='fa fa-filter'
            callback={() => setView(view => !view)}
          />
          <ComponentsSearch.Button
            label='Искать'
            icon='fa fa-search'
            callback={handleSubmit}
            type='submit'
          />
        </div>
        <fieldset className={!view ? s.hidden : ''}>
          <div className={s['form-search-date']}>
            <ComponentsSearch.SearchPeriod
              head='Дата создания'
              name='created_at'
              type='date'
              viewPeriod={period['created_at']}
              changeFormElement={changeFormElement}
              changePeriod={changePeriod}
            />
            <ComponentsSearch.SearchPeriod
              head='Дата изменения'
              name='updated_at'
              type='date'
              viewPeriod={period['updated_at']}
              changeFormElement={changeFormElement}
              changePeriod={changePeriod}
            />
          </div>
          <div className={s['form-search-price']}>
            <ComponentsSearch.SearchPeriod
              head='Цена'
              name='price'
              type='number'
              viewPeriod={period['price']}
              changeFormElement={changeFormElement}
              changePeriod={changePeriod}
            />
            <ComponentsSearch.SearchPeriod
              head='Цена по приходу'
              name='cost_price'
              type='number'
              viewPeriod={period['cost_price']}
              changeFormElement={changeFormElement}
              changePeriod={changePeriod}
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default FormSearch;
