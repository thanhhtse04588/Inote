import React, { Component } from "react";
import "./Note.css";
import CreateButton from "../Shared/createButton/createButton";
import DeleteButton from "../Shared/deleteButton/deleteButton";
import NoteItem from "./NoteItem/NoteItem";
import NoteDataService from "../../services/note.service";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      noteSelected: [],
      notesChecked: [],
      isEdit: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { folderID } = this.props;

    if (prevProps.folderID !== folderID && folderID) {
      this.reloadNoteList();
    }
    // case: empty folder list
    if (prevProps.folderID !== folderID && !folderID && prevProps.folderID) {
      this.setState({ notes: [] });
      this.props.handleSelect({});
    }
  }

  handleSelect = (noteSelected) => {
    this.setState({ noteSelected });
    this.props.handleSelect(noteSelected);
  };

  reloadNoteList = () => {
    const { folderID } = this.props;

    if (folderID == null) return;
    NoteDataService.getAll(folderID).then(
      (res) => {
        const notes = res.data.notes;
        this.setState({ notes });

        //check folder selected current, if it isn't exist, select folder[0]
        if (
          !notes.includes(this.state.noteSelected) &&
          !this.state.noteSelected
        )
          this.handleSelect(this.state.notes[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  handleNewNote = () => {
    const content = prompt("Please enter note name?");

    if (content != null) {
      NoteDataService.create(this.props.folderID, content).then(
        (res) => {
          this.reloadNoteList();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  handleClickEdit = () => {
    this.setState((prevstate) => ({
      isEdit: !prevstate.isEdit,
      notesChecked: [],
    }));
  };

  handleCheckbox = (note, e) => {
    const isChecked = e.target.checked;
    isChecked
      ? this.setState((prevState) => ({
          notesChecked: prevState.notesChecked.concat(note),
        }))
      : this.setState((prevState) => ({
          notesChecked: prevState.notesChecked.filter((item) => item !== note),
        }));
  };

  deleteNotesSelected = () => {
    const isDelete = window.confirm("Comfirm delete folders ?");
    if (!isDelete) return;

    const isDeleteAll = this.state.notesChecked.length === 0;
    const listDelete = this.state[isDeleteAll ? "notes" : "notesChecked"];

    listDelete.forEach(({ _id }) => {
      this.deleteNote(_id);
    });

    this.reloadNoteList();
    this.setState({
      notesChecked: [],
    });
  };

  deleteNote = (noteID) => {
    NoteDataService.delete(noteID).then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  render() {
    const selectedId = (this.state.noteSelected || {})._id;

    const isEdit = this.state.isEdit;

    const notesCheckedLength = this.state.notesChecked.length;

    const buttonEdit = (
      <span className="editButton" onClick={this.handleClickEdit}>
        {isEdit ? "Done" : "Edit"}
      </span>
    );

    const buttonBotton = isEdit ? (
      <DeleteButton
        nameButton={notesCheckedLength === 0 ? "Delete all" : "Delete"}
        onDelete={this.deleteNotesSelected}
      />
    ) : (
      <CreateButton handleClick={this.handleNewNote} nameButton="New Note" />
    );

    return (
      <div>
        <div className="noteHeader">
          <div className="textHeader">
            {notesCheckedLength === 0
              ? "Notes"
              : notesCheckedLength + " Selected"}
          </div>
          {buttonEdit}
        </div>

        <div className="noteContent">
          {(this.state.notes || []).map((note) => (
            <NoteItem
              key={note._id}
              item={note}
              isActive={selectedId === note._id}
              isEdit={isEdit}
              handleCheckbox={this.handleCheckbox}
              handleSelect={this.handleSelect}
            />
          ))}
        </div>
        {buttonBotton}
      </div>
    );
  }
}
