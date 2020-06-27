"use strict";

exports.name = "models.note";

exports.requires = ["@mongoose"];

exports.factory = function (mongoose) {
  return mongoose.model(
    "Note",
    new mongoose.Schema({
      folderID: String,
      content: String,
      createdAt: {
        type: String,
        required: false,
        default: Date.now,
      },
      folders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Folder",
        },
      ],
    })
  );
};
