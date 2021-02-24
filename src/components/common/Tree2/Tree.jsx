import React from "react";
import s from "./Tree.module.css";
import createTree from "./treeFunctions2";
import Node from "./Node";


const Tree = props => {

  const root = createTree(props.data);

  function createSubTree(item, lvl = 0) {
    let hidden;
    lvl += 1;
    let children = [];
    if (item.children?.length) {
      children = item.children.map(elem => {
        return createSubTree(elem, lvl);
      });
    }
    hidden = lvl > 1;
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

  return (
      <div id={'Tree2'} className={s.tree}>
        {/* <h3>{tree.label}</h3> */}
        <ul>{createSubTree(root)}</ul>
      </div>

  );
};

export default Tree;
