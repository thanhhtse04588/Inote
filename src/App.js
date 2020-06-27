import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Folder from './components/Folder/Folder';
import Note from './components/Note/Note';
import Content from './components/Content/Content';
import Notepad from './assets/notepad.svg';
import AppContext from './AppContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderSelected: {},
      handleSelectFolder: this.handleSelectFolder,
      noteSelected: {},
      handleSelectNote: this.handleSelectNote,
    };
  }

  handleSelectFolder = (folderSelected) => {
    this.setState({ folderSelected });
  };

  handleSelectNote = (noteSelected) => {
    this.setState({ noteSelected });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <Container>
            <Row>
              <Col md={3} className="border-right col-100vh">
                <Header />
                <Folder />
              </Col>
              <Col md={3} className="col-100vh">
                {/* <Note /> */}
              </Col>
              <Col md={6} className="border-left col-100vh">
                {/* <Content /> */}
                <CopyRight />
              </Col>
            </Row>
          </Container>
        </div>
      </AppContext.Provider>
    );
  }
}

const Header = () => {
  return (
    <div className="App-header">
      <img alt="Inote Logo" className="App-logo" src={Notepad} />
      iNote App
    </div>
  );
};

const CopyRight = () => {
  return (
    <div className="App-link">
      <span>Copyright &copy; 2020 </span>
      <a
        href="https://rikkeisoft.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Rikkeisoft
      </a>
    </div>
  );
};

export default App;
