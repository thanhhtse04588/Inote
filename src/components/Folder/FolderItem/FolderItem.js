import React, { useContext } from 'react';
import './FolderItem.css';
import next from '../../../assets/next.png';
import AppContext from '../../../AppContext';

const folderItem = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(AppContext);
  const folder = props.folder;
  const actived = props.isActive ? 'item actived' : 'item';

  return props.isEdit ? (
    <div className={actived}>
      <input
        onClick={props.handleCheckbox.bind(this, folder)}
        type="checkbox"
      />
      <span
        onClick={props.handleRename.bind(this, folder)}
        className="folderName"
      >
        {folder.name}
      </span>
    </div>
  ) : (
    <div
      className={actived}
      onClick={context.handleSelectFolder.bind(this, folder)}
    >
      <span className="folderName">{folder.name}</span>
      <img alt="next" className="nextButton" src={next} />
    </div>
  );
};

export default folderItem;
