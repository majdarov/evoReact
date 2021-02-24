import React, { useEffect, useState } from "react";

const Node = props => {

  const [icon, setIcon] = useState(null/* props.hidden ? 'far fa-folder' : 'far fa-folder-open' */);

  const [isOpen, setIsOpen] = useState(null/* props.hidden ? 'closed' : 'open' */);

  const hasChildren = !!props.children.length;

  const [hidden, setHidden] = useState(props.hidden);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (hidden) {
      setIcon("far fa-folder");
      setIsOpen(hasChildren ? "closed children" : "closed");
    } else {
      setIcon("far fa-folder-open");
      setIsOpen(hasChildren ? "open children" : "open");
    }
  }, [hidden, hasChildren])

  const clickGroup = (ev) => {
    ev.stopPropagation();
    if (props.id !== '0' && props.id !== 'root') setHidden(hidden => !hidden);
    if (props.callback) {
      let tagName = ev.target.tagName;
      props.callback(props.id.toString(), tagName);
    }
  }

  return (
    <>
      <li id={props.id} className={isOpen} onClick={clickGroup}>
        <i className={icon}></i>
        <span className={(selected && props.classSelected) || ''}>
          {props.label}
        </span>
        {(props.id !== '0' && props.id !== 'root') && hasChildren &&
          <span className={props.className}>
            {props.children.length}
          </span>}
        {hasChildren && <ul hidden={hidden}>{props.children}</ul>}
      </li>
    </>
  );
};

export default Node;
