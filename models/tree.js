const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const obstacle = require("./obstacle");

const TreeSchema = new Schema({
    obstacle: [{
    type: Schema.Types.ObjectId,
    ref: "Obstacle",
    required: true
    }],
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        default: 0
    },
    obstructed_O: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    chute_H: {
        type: Number,
        min: 0,
        max: 4,
        default: 0
    }
});

// Virtual for tree's URL
TreeSchema.virtual("url").get(function () {
    return `/catalog/tree/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Tree", TreeSchema);