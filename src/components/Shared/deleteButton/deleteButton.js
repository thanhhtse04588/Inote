import React from "react";
import "./deleteButton.css";

const deleteButton = (props) => {
  return (
    <div className="deleteFolder">
      <span onClick={props.onDelete}>{props.nameButton}</span>
    </div>
  );
};

export default deleteButton;
