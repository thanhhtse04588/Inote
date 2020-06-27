'use strict';

exports.name = 'models.folder';

exports.requires = [
    '@mongoose'
];

exports.factory = function (mongoose) {

    return mongoose.model(
        "Folder",
        new mongoose.Schema({
            name: String,
            slug: String,
            createdAt: {
                type: String,
                required: false,
                default: Date.now
            }
        })
    );
};
