import React from "react";
import s from "./Tree.module.css";
import createTree from "./treeFunction";
import Node from "./Node";

const Tree = props => {

  let nodeRoot = { id: 0, label: props.price, childs: [] };
  let tree = { id: "Tree", label: props.treeLabel, childs: [nodeRoot] };

  createTree(props.data, tree);

  function handleClick(e) {
    const testTarget = () => {
      if (e.target.tagName !== "SPAN" &&
          e.target.tagName !== "I" &&
          e.target.tagName !== "LI" &&
          e.target.className !== s['children-length']) return false;
      return true;
    }
    if (!testTarget()) return;
    // ***SPAN toggle selected
    document
      .getElementById("Tree")
      .querySelectorAll("span")
      .forEach(item => {
        if (item.className === s.selected) item.className = null;
      });
    let elem;
    if (e.target.tagName === "SPAN") {
      e.target.className = s.selected;
      elem = e.target.closest("li");
    } else if (e.target.tagName === "LI") {
      e.target.querySelector('span').className = s.selected;
      elem = e.target;
    } else {
      e.target.nextSibling.className = s.selected;
      elem = e.target.closest("li");
    }
    // SPAN***
    if (!elem) return;
    let hasChildren = !!elem.className.match(/children/)?.length
    if (elem.id !== "0") {
      let target = elem.querySelector("ul");
      if (target) {
        target.hidden = !target.hidden;
        if (target.hidden) {
          elem.className = hasChildren ? "closed children" : "closed";
          elem.firstElementChild.className = "far fa-folder";
        } else {
          elem.className = hasChildren ? "open children" : "open";
          elem.firstElementChild.className = "far fa-folder-open";
        }
      }
    }

    if (props.callback) {
      let tagName = e.target.tagName;
      props.callback(elem.id, tagName);
    }

  }

  function createSubTree(item, lvl = 0) {
    let hidden;
    lvl += 1;
    let children = [];
    if (item.childs?.length) {
      children = item.childs.map(elem => {
        return createSubTree(elem, lvl);
      });
    }
    hidden = lvl > 1 ? "hidden" : null;
    return (
      <Node
        id={item.id}
        key={item.id}
        label={item.label}
        children={children}
        hidden={hidden}
        className={s['children-length']}
      />
    );
  }

  let treeElements = createSubTree(nodeRoot);

  return (
    <div id={tree.id} className={s.tree} onClick={handleClick}>
      <h3>{tree.label}</h3>
      <ul>{treeElements}</ul>
    </div>
  );
};

export default Tree;
