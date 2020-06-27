"use strict";

exports.name = "routes.api";

exports.requires = ["@express", "controllers.folder", "controllers.note"];

exports.factory = function (express, folderController, noteController) {
  let router = express.Router();

  router.get("/folders", folderController.getFolders);
  router.post("/folders", folderController.newFolder);
  router.put("/folders/:folderId", folderController.updateFolder);
  router.get("/folders/:folderId", folderController.getFolderById);
  router.delete("/folders/:folderId", folderController.deleteFolder);

  router.get("/notes/:folderId", noteController.getNotes);
  router.post("/notes", noteController.newNote);
  router.put("/notes/:noteId", noteController.updateNote);
  router.delete("/notes/:noteId", noteController.deleteNote);

  return router;
};
