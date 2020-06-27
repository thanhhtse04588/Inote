"use strict";

exports.name = "controllers.note";

exports.requires = ["@lodash", "models.note"];

exports.factory = function (_, Note) {
  const getNotes = (req, res, next) => {
    const folderID = req.params.folderId;
    Note.find({ folderID }, function (err, notes) {
      if (err) {
        console.error(err);
        res.status(404).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ notes });
    });
  };

  const newNote = (req, res, next) => {
    const { folderID, content } = _.get(req, "body", "");

    new Note({
      folderID: folderID,
      content: content,
    }).save(function (err, note) {
      if (err) {
        console.error(err);
        res.status(500).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ note });
    });
  };

  const updateNote = (req, res, next) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.noteId;

    Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Note with id=${id}. Maybe Tutorial was not found!`,
          });
        } else res.send({ message: "Note was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Note with id=" + id,
        });
      });
  };

  const deleteNote = (req, res, next) => {
    const id = req.params.noteId;
    Note.findByIdAndRemove(id)
      .exec()
      .then(() =>
        res.status(204).json({
          success: true,
        })
      )
      .catch((err) =>
        res.status(500).json({
          success: false,
        })
      );
  };

  return {
    getNotes,
    newNote,
    updateNote,
    deleteNote,
  };
};
