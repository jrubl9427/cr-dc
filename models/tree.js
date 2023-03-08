const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TreeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    obstructed_O: {
        type: Number,
        min: 0,
        max: 1
    },
    chute_H: {
        type: Number,
        min: 0,
        max: 4
    }
});

// Virtual for tree's URL
TreeSchema.virtual("url").get(function () {
    return `/catalog/tree/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Tree", TreeSchema);