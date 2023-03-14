const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TargetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 2,
        max: 10,
        default: 2
    },
    obstructed_O: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    visibility_V: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    }
});

// Virtual for target's URL
TargetSchema.virtual("url").get(function () {
    return `/catalog/target/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Target", TargetSchema);