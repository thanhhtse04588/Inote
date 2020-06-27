import React from "react";
import "./NoteItem.css";

const noteItem = (props) => {
  const itemStyle = props.isActive ? "item actived" : "item";
  const checkbox = (
    <input
      onClick={props.handleCheckbox.bind(this, props.item)}
      type="checkbox"
    />
  );

  return (
    <div className={itemStyle}>
      {props.isEdit && checkbox}
      <span
        className="noteName"
        onClick={props.handleSelect.bind(this, props.item)}
      >
        {props.item.content}
      </span>
    </div>
  );
};

export default noteItem;
