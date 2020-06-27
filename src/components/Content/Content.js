/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import "./Content.css";
import NoteDataService from "../../services/note.service";

const content = (props) => {
  const [content, setTextContent] = useState(props.note.content);
  const [isChange, setIsChange] = useState(false);

  // eslint-disable-next-line no-undef
  useEffect(() => {
    setTextContent(props.note.content);
  }, [props.note]);

  const handleClickSave = async () => {
    props.reRenderNoteList();
    await NoteDataService.update(props.note._id, { content });
    setIsChange(false);
  };

  const handleChange = (e) => {
    setTextContent(e.target.value);
    setIsChange(true);
  };

  return (
    <>
      <div className="contentHeader">
        <div className="textHeader">Content</div>
        {isChange && (
          <span className="editButton" onClick={handleClickSave}>
            Save
          </span>
        )}
      </div>

      <textarea
        value={content}
        className="content"
        onChange={handleChange}
      ></textarea>
    </>
  );
};

export default content;
