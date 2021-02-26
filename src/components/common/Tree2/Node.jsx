import React, { useEffect, useState } from "react";

const Node = props => {

  const [icon, setIcon] = useState(null/* props.hidden ? 'far fa-folder' : 'far fa-folder-open' */);

  const [isOpen, setIsOpen] = useState(null/* props.hidden ? 'closed' : 'open' */);

  const hasChildren = !!props.children.length;

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (props.hidden) {
      setIcon("far fa-folder");
      setIsOpen(hasChildren ? "closed children" : "closed");
    } else {
      setIcon("far fa-folder-open");
      setIsOpen(hasChildren ? "open children" : "open");
    }
  }, [props.hidden, hasChildren])

  return (
    <>
      <li id={props.id} className={isOpen}>
        <i className={icon}></i>
        <span className={(selected && props.classSelected) || ''}>
          {props.label}
        </span>
        {(props.id !== '0' && props.id !== 'root') && hasChildren &&
          <span className={props.className}>
            {props.children.length}
          </span>}
        {hasChildren && <ul hidden={props.hidden}>{props.children}</ul>}
      </li>
    </>
  );
};

export default Node;
