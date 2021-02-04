import React, { useEffect, useState } from "react";

const Node = props => {

  //const icon = props.hidden ? ["far fa-folder", "closed"] : ["far fa-folder-open", "open"];

  const [icon, setIcon] = useState(null);

  const [isOpen, setIsOpen] = useState(null);

  const [hasChildren, setHasChildren] = useState(false);

  useEffect(() => {
    if (props.hidden) {
      setIcon("far fa-folder");
      setIsOpen("closed");
    } else {
      setIcon("far fa-folder-open");
      setIsOpen("open");
    }
  }, [props.hidden])

  useEffect(() => {
    if (props.children.length) {
      setHasChildren(true);
      setIsOpen(isOpen => `${isOpen} children`)
    } else {
      setHasChildren(false);
      setIsOpen(isOpen => isOpen);
    }
  }, [props.children.length]);

  return (
    <>
      <li id={props.id} className={isOpen}>
        <i className={icon}></i>
        <span>
          {props.label}
        </span>
        {!!props.id && hasChildren &&
          <span className={props.className}>
            {props.children.length}
          </span>}
        {hasChildren && <ul hidden={props.hidden}>{props.children}</ul>}
      </li>
    </>
  );
};

export default Node;
