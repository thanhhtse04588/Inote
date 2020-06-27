"use strict";

exports.name = "controllers.folder";

exports.requires = ["@lodash", "models.folder"];

exports.factory = function (_, Folder) {
  const getFolderById = (req, res, next) => {
    const _id = req.params.folderId;
    Folder.findOne({ _id }, function (err, folder) {
      if (err) {
        console.error(err);
        res.status(404).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ folder });
    });
  };

  const getFolders = (req, res, next) => {
    Folder.find({}, function (err, folders) {
      if (err) {
        console.error(err);
        res.status(404).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ folders });
    });
  };

  const newFolder = (req, res, next) => {
    var name = _.get(req, "body.name", "").trim();

    if (!name) {
      res.status(500).send({
        errors: ["folder name not found."],
      });
    }

    new Folder({
      name: name,
      slug: name
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-"),
    }).save(function (err, folder) {
      if (err) {
        console.error(err);
        res.status(500).send({
          errors: [err.message],
        });
        return;
      }
      res.json({ folder });
    });
  };

  const updateFolder = (req, res, next) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.folderId;

    Folder.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Folder with id=${id}. Maybe Tutorial was not found!`,
          });
        } else res.send({ message: "Folder was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Folder with id=" + id,
        });
      });
  };

  const deleteFolder = (req, res, next) => {
    const id = req.params.folderId;
    Folder.findByIdAndRemove(id)
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
    getFolders,
    newFolder,
    updateFolder,
    deleteFolder,
    getFolderById,
  };
};
