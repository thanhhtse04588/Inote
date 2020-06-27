import React from 'react';

const AppContext = React.createContext({
  folderSelected: {},
  handleSelectFolder: () => {},
  noteSelected: {},
  handleSelectNote: () => {},
});

export default AppContext;
