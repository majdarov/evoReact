import React, { useEffect, useState } from "react";
import s from "./Commodity.module.css";
import Tree from "../common/Tree/Tree";
import ListCommodities from "./ListCommodities/ListCommodities";
import Preloader from "../common/Preloader/Preloader";
import FormModalWrapper from "./Forms/FormModalWrapper";
import FormProduct from "./Forms/FormProduct";

function toggleHidden(pid) {
  if (pid === '0') return;
  let tree = document.getElementById('Tree');
  tree.querySelectorAll('span').forEach(item => {
    item.className = '';
  })
  let li = document.getElementById(pid);
  li.querySelector('span').className = s.selected;
  let ul = li.closest('ul');
  if (ul.hidden) {
    ul.hidden = !ul.hidden;
  }
  let currentLi = ul.closest('li');
  while (currentLi.id !== '0') {
    currentLi.classList = 'open';
    currentLi = currentLi.closest('ul').closest('li');
  }
}

const Commodity = props => {

  const [groupName, setGroupName] = useState('Commodities');

  useEffect(() => {
    if (props.groups.length) {
      if (props.pid !== '0') {
        const group = props.groups.find(item => item.id === props.pid);
        var gName = group.label;
        toggleHidden(props.pid);

      } else {
        gName = 'Commodities';
      }
      setGroupName(gName);
    }
  }, [props.groups, props.pid]);

  if (!props.isLoaded) {
    props.setPid('0');
    props.getGroups();
  }
  if (!props.comIsLoaded) {
    props.getProducts(props.pid);
  }

  if (props.error) {
    alert(`${props.error.name}\n\r${props.error.message}`);
    props.setError(null);
  }

  function newData() {
    props.getProductId('');
  }

  async function changePid(eId) {
    if (props.pid === eId) return;
    props.setPid(eId);
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
            <button onClick={newData}>New Product</button>
          </div>
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
          <Tree
            data={props.groups}
            price="Price"
            treeLabel="Groups"
            callback={changePid}
            pId={props.pid}
          />
          <div className={s.list}>
            <h3>{groupName}</h3>
            <ListCommodities
              commodities={props.commodities}
              comIsLoaded={props.comIsLoaded}
              error={props.error}
              getProductId={props.getProductId}
              deleteProduct={props.deleteProduct}
              pid={props.pid}
            />
          </div>

        </div>
      </>
    );
  }
};

export default Commodity;
