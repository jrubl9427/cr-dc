const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SurfaceSchema = new Schema({
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
    tiered_T: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    unpleasant_U: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    }
});

// Virtual for surface's URL
SurfaceSchema.virtual("url").get(function () {
    return `/catalog/surface/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Surface", SurfaceSchema);