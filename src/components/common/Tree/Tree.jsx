import React, { useEffect, useState } from "react";
import s from "./Tree.module.css";
import createTree, { chooseNotHiddenGroups } from "./treeFunction";
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
    hidden = lvl > 1 && !arrNotHidden.includes(({id}) => id === item.id);
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
        viewEdit={props.viewEdit}
      />
    );
  }

  useEffect(() => {
    let arr = chooseNotHiddenGroups(props.pId, props.data);
    setArrNotHidden([...arr]);
  }, [props.data, props.pId])

  return (
    <CurrentPidContext.Provider value={context}>
      <div id={tree.id} className={s.tree}>
        {/* <h3>{tree.label}</h3> */}
        <ul>{createSubTree(nodeRoot)}</ul>
      </div>
    </CurrentPidContext.Provider>

  );
};

export default Tree;
