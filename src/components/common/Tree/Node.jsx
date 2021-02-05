import React, { useEffect, useState } from "react";

const Node = props => {

  const [icon, setIcon] = useState(/* props.hidden ? 'far fa-folder' : 'far fa-folder-open' */);

  const [isOpen, setIsOpen] = useState(/* props.hidden ? 'closed' : 'open' */);

  const [hasChildren, setHasChildren] = useState(!!props.children.length);

  const [hidden, setHidden] = useState(props.hidden);

  useEffect(() => {
    if (hidden) {
      setIcon("far fa-folder");
      setIsOpen(hasChildren ? "closed children" : "closed");
    } else {
      setIcon("far fa-folder-open");
      setIsOpen(hasChildren ? "open children" : "open");
    }
  }, [hidden, hasChildren])

  useEffect(() => {
    if (hasChildren) {
      setHasChildren(true);
      setIsOpen(isOpen => `${isOpen} children`)
    } else {
      setHasChildren(false);
      setIsOpen(isOpen => isOpen);
    }
  }, [hasChildren]);

  const clickGroup = (ev) => {
    ev.stopPropagation();
    if (props.id) setHidden(hidden => !hidden);
    if (props.callback) {
      let tagName = ev.target.tagName;
      props.callback(props.id.toString(), tagName);
    }
  }

  return (
    <>
      <li id={props.id} className={isOpen} onClick={clickGroup}>
        <i className={icon}></i>
        <span>
          {props.label}
        </span>
        {!!props.id && hasChildren &&
          <span className={props.className}>
            {props.children.length}
          </span>}
        {hasChildren && <ul hidden={hidden}>{props.children}</ul>}
      </li>
    </>
  );
};

export default Node;
