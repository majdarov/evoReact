import React from "react";

const Node = props => {
  let ul;
  const [closed, open] = props.hidden ? ["fas fa-folder", "closed"] : ["fas fa-folder-open", "open"];
  if (props.children.length) {
    ul = <ul hidden={props.hidden}>{props.children}</ul>;
  }

  return (
    <>
      <li id={props.id} className={open}>
        <i className={closed}></i>
        <span >
          {props.label}
        </span>
        {ul}
      </li>
    </>
  );
};

export default Node;
