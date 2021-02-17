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

const Commodity = props => {

  const [groupIsEmpty, setGroupIsEmpty] = useState(false);
  const [groupName, setGroupName] = useState('Товары');
  const { items, setFilterConfig } = useFilteredData(props.commodities);
  const [pid, setPidSearch] = useState(props.pid);

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

  const setCommodities = props.setCommodities;

  useEffect(() => {
    setCommodities(items);
  }, [items, setCommodities])

  function newData() {
    props.getProductId();
  }

  function changePid(eId) {
    if (props.pid === eId) return;
    props.setPid(eId);
    setPidSearch(eId);
  }

  const searchProducts = async (formData) => {

    setGroupName('Результаты поиска');
    // console.log('searchProducts:', formData)
    setFilterConfig(formData);
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

  const formSearchProps = { searchProducts, returnBeforeSearch, parent_id: pid }

  if (props.error) {
    return <div>Ошибка...{props.error.message}</div>;
  } else if (!props.isLoaded) {
    return <Preloader />
  } else {
    return (
      <>
        <div className={s.head}>
          <div className={s.buttons}>
            <span className={`${s['button-add']} fa`} onClick={newData}>
              +Товар
            <i className='fa fa-file'></i>
            </span>
          </div>
          <FormSearch {...formSearchProps} />
        </div>
        {props.viewForm &&
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
          />}
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
