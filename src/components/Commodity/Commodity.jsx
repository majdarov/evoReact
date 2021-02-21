import React, { useEffect, useMemo, useState } from "react";
import s from "./Commodity.module.css";
import Preloader from "../common/Preloader/Preloader";
import FormModalWrapper from "./Forms/FormModalWrapper";
import FormProduct from "./Forms/FormProduct";
import Table from "../common/Table";
import { ProgressBar } from "../common/ProgressBar";
import FormSearch from "./Forms/FormSearch";
import useFilteredData from "../../Hooks/useFilteredData";
import GroupsTree from "../common/GroupsTree";

const Commodity = props => {

  const { items, setFilterConfig } = useFilteredData(/* props.commodities */);
  const [pid, setPidSearch] = useState(props.pid);
  const setCommodities = props.setCommodities;
  const schema = useMemo(() => {
    let sch = props.schema;
    let schema = [];
    Object.keys(sch).forEach((key) => {
      let lbl;
      if (sch[key][1]) {
        lbl = sch[key][0] ? sch[key][0] : key;
        schema.push([key, lbl]);
      }
    });
    console.log(schema);
    return schema;
  }, [props.schema]);
  const [showTreeView, setShowTreeView] = useState(false);

  if (!props.isInit) {
    props.history.push('/settings');
  }

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

  useEffect(() => {
    setCommodities(items);
  }, [items, setCommodities])

  function newData() {
    props.getProductId();
  }

  function clickGroups() {
    setShowTreeView(!showTreeView);
  }

  const callbackTree = (id, tagName) => {
    let parent_id = id ? id : 0;
    if (tagName !== 'SPAN') return;
    changePid(parent_id);
    setShowTreeView(false);
  }

  function changePid(eId) {
    if (props.pid === eId) return;
    props.setPid(eId);
    setPidSearch(eId);
  }

  const searchProducts = (formData) => {
    setFilterConfig(formData);
  }

  function returnBeforeSearch() {
    props.getProducts(props.pid);
  }

  // async function delGroup(ev) {
  //   if (ev.target.tagName !== 'SPAN') return;
  //   let confirmDel = window.confirm(`Вы действительно хотите удалить группу\n\r${groupName}\n\rid: ${props.pid}?`)
  //   if (confirmDel) {
  //     let parentGroup = (await apiIDB.getGroup(props.pid)).parent_id;
  //     if (!parentGroup) parentGroup = '0';
  //     await props.deleteProduct(props.pid, parentGroup, 'group')
  //   } else {
  //     alert('DELETED CANCEL');
  //   }
  // }

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
          />
        }
        <div className={s.container}>
          <GroupsTree
            groups={props.groups}
            treeView={showTreeView}
            onClick={clickGroups}
            callbackTree={callbackTree}
            parent_id={props.pid}
          />
          <div className={s.list}>
            {/* <h3>{groupName}  {groupIsEmpty && <span className={s.del} onClick={delGroup}></span>}</h3> */}
            {!props.comIsLoaded && <ProgressBar limit={20} text={'Processing...'} />}
            {props.comIsLoaded &&
              <Table
                products={props.commodities}
                // headers={headers}
                callback={props.getProductId}
                deleteProduct={props.deleteProduct}
                schema={schema}
              />}
          </div>
        </div>
      </>
    );
  }
};

export default Commodity;
