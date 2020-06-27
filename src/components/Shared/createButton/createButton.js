import "./createButton.css";
import React from "react";

const createButton = (props) => {
  return (
    <div className="createButton">
      <span onClick={props.handleClick}>{props.nameButton}</span>
    </div>
  );
};

export default createButton;
