import React from "react";

const Node = props => {
  let ul;
  const [icon, open] = props.hidden ? ["far fa-folder", "closed"] : ["far fa-folder-open", "open"];
  if (props.children.length) {
    ul = <ul hidden={props.hidden}>{props.children}</ul>;
  }

  return (
    <>
      <li id={props.id} className={open}>
        <i className={icon}></i>
        <span>
          {props.label}
        </span>
        {ul}
      </li>
    </>
  );
};

export default Node;
