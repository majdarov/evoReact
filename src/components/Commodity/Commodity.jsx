import React, { useEffect, useState } from "react";
import s from "./Commodity.module.css";
import Tree from "../common/Tree/Tree";
import Preloader from "../common/Preloader/Preloader";
import FormModalWrapper from "./Forms/FormModalWrapper";
import FormProduct from "./Forms/FormProduct";
import { apiIDB } from "../../api/apiIDB";
import { isEmptyGroup } from "../../api/apiUtils";
import Table from "../common/Table";
import { ProgressBar } from "../common/ProgressBar";
import FormSearch from "./Forms/FormSearch";
import useFilteredData from "../../Hooks/useFilteredData";

const wrapper = (fn, args) => {
  let _this = this;
  if (fn === String.prototype.match) {
    _this = args[0];
    args = args.slice(1);
  }
  return fn.call(_this, ...args);
}

function filterProd(item, search = []) {
  /* search = [
    [[criteria1], [value1], [funcEqual]]
    (, [...criteria2])
  ] */
  if (!item) return false;
  if (!search.length) return true;
  let filterResult = search.reduce((acc, curr) => {
    if (!item[curr[0]]) return acc;
    // return (item[curr[0]] === curr[1]) || acc;
    // return curr[2].call(item[curr[0]], curr[1]) || acc;
    return wrapper(curr[2], [item[curr[0]], curr[1]]) || acc;
  }, false);
  // console.log(filterResult)
  return filterResult;
}

const Commodity = props => {

  const [groupIsEmpty, setGroupIsEmpty] = useState(false);
  const [groupName, setGroupName] = useState('Товары');
  const [hiddenSearch, setHiddenSearch] = useState(true);
  // const [formData, setFormData] = useState(null);
  // const { items, setFilterConfig, search } = useFilteredData([]);

  const headers = [
    ['Code'],
    ['Name'],
    ['Price'],
    ['Quant'],
    ['Article'],
  ];

  if (!props.isInit) {
    props.history.push('/settings');
  }

  useEffect(() => { //check isEmptyGroup
    isEmptyGroup(props.pid).then(res => setGroupIsEmpty(res));
  }, [props.pid])

  useEffect(() => { //get groups & products
    if (!props.isLoaded && props.isInit) {
      props.setPid('0');
      props.getGroups();
    }
    if (!props.comIsLoaded && props.isInit) {
      props.getProducts(props.pid);
      // setFilterConfig({ parent_id: props.pid })
      // props.setCommodities(props.commodities.filter(item => item.parent_id === props.pid));
    }

    if (props.error) {
      alert(`${props.error.name}\n\r${props.error.message}`);
      props.setError(null);
    }
  }, [props])

  useEffect(() => { //set label group
    if (props.groups.length) {
      if (props.pid !== '0') {
        const group = props.groups.find(item => item.id === props.pid);
        var gName = group?.label || 'Товары';
      } else {
        gName = 'Товары';
      }
      setGroupName(gName);
    }
  }, [props.groups, props.pid]);

  function newData() {
    props.getProductId();
  }

  function changePid(eId) {
    if (props.pid === eId) return;
    props.setPid(eId);
  }

  async function searchProducts(e) {
    setGroupName('Результаты поиска');
    let name = new RegExp(e.target.value, 'gi');
    if (name.source === '(?:)' || name.source.length < 2) {
      returnBeforeSearch();
      return;
    }
    let match = String.prototype.match;
    let search = [['name', name, match], ['article_number', name, match]]
    let products = (await apiIDB.getProduct()).filter(item => filterProd(item, search));
    // let products = (await apiIDB.getProduct()).filter(item => item.name.match(name) || item.article_number?.match(name));
    props.setCommodities(products);
  }

  function returnBeforeSearch() {
    props.getProducts(props.pid);
    if (props.pid !== '0') {
      var gName = props.groups.find(item => item.id === props.pid).label;
    } else {
      gName = 'Товары';
    }
    setGroupName(gName);
  }

  function clearSearch(e) {
    if (e.target.tagName !== 'I') return;
    e.target.closest('div').querySelector('input').value = '';
    returnBeforeSearch();
  }

  async function delGroup(ev) {
    if (ev.target.tagName !== 'SPAN') return;
    let confirmDel = window.confirm(`Вы действительно хотите удалить группу\n\r${groupName}\n\rid: ${props.pid}?`)
    if (confirmDel) {
      let parentGroup = (await apiIDB.getGroup(props.pid)).parent_id;
      if (!parentGroup) parentGroup = '0';
      await props.deleteProduct(props.pid, parentGroup, 'group')
    } else {
      alert('DELETED CANCEL');
    }
  }

  if (props.error) {
    return <div>Ошибка...{props.error.message}</div>;
  } else if (!props.isLoaded) {
    return <Preloader />
  } else {
    return (
      <>
        <div className={s.head}>
          <div className={s.buttons}>
            <button onClick={newData}>+Товар</button>
          </div>
          <div className={s.search} onClick={clearSearch}>
            <label>
              Поиск товара
              <input type="text" onChange={searchProducts} />
              <i className='fa fa-times'></i>
            </label>
            <label>Поиск в текущей группе
              <input type="checkbox" name={s['current-pid']} id={props.pid} />
            </label>
          </div>
          <i className="fa fa-filter" id={s['icon-filter']} onClick={() => setHiddenSearch(!hiddenSearch)}></i>
          {!hiddenSearch && <FormSearch />}
        </div>
        {props.viewForm ?
          // <FormProductFormik />
          <FormModalWrapper
            form={
              <FormProduct
                groups={props.groups}
                formData={props.formData}
                formPost={props.formPost}
                formError={props.formError}
                setViewForm={props.setViewForm}
                setFormData={props.setFormData}
                toggleFormPost={props.toggleFormPost}
                postFormData={props.postFormData}
                setFormError={props.setFormError}
                pid={props.pid}
              />
            }
          />
          : null}
        <div className={s.container}>
          <div className={s.list}>
            <h3>Группы</h3>
            <Tree
              data={props.groups}
              price="Price"
              callback={changePid}
              pId={props.pid}
            />
          </div>
          <div className={s.list}>
            <h3>{groupName}  {groupIsEmpty && <span className={s.del} onClick={delGroup}></span>}</h3>
            {!props.comIsLoaded && <ProgressBar limit={20} text={'Processing...'} />}
            {props.comIsLoaded &&
              <Table
                products={props.commodities}
                headers={headers}
                callback={props.getProductId}
                deleteProduct={props.deleteProduct}
              />}
          </div>

        </div>
      </>
    );
  }
};

export default Commodity;
