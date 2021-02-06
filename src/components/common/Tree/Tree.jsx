import React, { useEffect, useState } from "react";
import s from "./Tree.module.css";
import createTree from "./treeFunction";
import Node from "./Node";

export const CurrentPidContext = React.createContext({ pId: 'no' });

const Tree = props => {

  const nodeRoot = { id: '0', label: props.price, childs: [] };
  const tree = { id: "Tree", label: props.treeLabel, childs: [nodeRoot] };
  const [arrNotHidden, setArrNotHidden] = useState([]);
  const context = { pId: props.pId, arrNotHidden };

  createTree(props.data, tree);

  function createSubTree(item, lvl = 0) {
    let hidden;
    lvl += 1;
    let children = [];
    if (item.childs?.length) {
      children = item.childs.map(elem => {
        return createSubTree(elem, lvl);
      });
    }
    hidden = lvl > 1;
    return (
      <Node
        id={item.id}
        parent_id={item.pid}
        key={item.id}
        label={item.label}
        children={children}
        hidden={hidden}
        className={s['children-length']}
        classSelected={s.selected}
        callback={true && props.callback}
      />
    );
  }

  useEffect(() => {
    if (props.pId && props.pId !== '0') {
      let arr = [];
      let current = props.data.find(g => g.id === props.pId);
      if (!current.pid) current.pid = '0';
      while (current.pid !== '0') {
        let elem = props.data.find(g => g.id === current.pid);
        if (!elem) break;
        arr.push(elem.id);
        current = elem;
      }
      setArrNotHidden([...arr]);
    }
  }, [props.data, props.pId])

  return (
    <div id={tree.id} className={s.tree} /* onClick={handleClick} */>
      <h3>{tree.label}</h3>
      <CurrentPidContext.Provider value={context}>
        <ul>{createSubTree(nodeRoot)}</ul>
      </CurrentPidContext.Provider>
    </div>
  );
};

export default Tree;
