import React from "react";
import s from "./Tree.module.css";
import createTree from "./treeFunctions";
import Node from "./Node";


const Tree = props => {

  const root = createTree(props.data);

  function createSubTree(item/* , lvl = 0 */) {
    // let hidden;
    // lvl += 1;
    let children = [];
    if (item.children?.length) {
      children = item.children.map(elem => {
        return createSubTree(elem/* , lvl */);
      });
    }
    let hidden = !item.parent_id ? false : true;
    // hidden = lvl > 1;
    return (
      <Node
        id={item.id}
        parent_id={item.pid}
        key={item.id}
        label={item.name}
        children={children}
        hidden={hidden}
        className={s['children-length']}
        classSelected={s.selected}
        callback={true && props.callback}
      />
    );
  }

  const clickGroup = (ev) => {
    ev.stopPropagation();
    let tagName = ev.target.tagName;
    if (['LI', 'SPAN', 'I'].includes(tagName)) {
      let elem = tagName === 'LI' ? ev.target : ev.target.closest('li')
      if (elem.id !== '0' && elem.id !== 'root') {
        let ul = elem.querySelector('ul');
        ul.hidden = !ul.hidden;
      }
      if (props.callback) {
        props.callback(elem.id.toString(), tagName);
      }
    }
  }

  return (
    <div id={'Tree2'} className={s.tree} onClick={clickGroup}>
      {/* <h3>{tree.label}</h3> */}
      <ul>{createSubTree(root)}</ul>
    </div>

  );
};

export default Tree;
