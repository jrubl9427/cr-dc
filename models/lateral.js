const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LateralSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        default: 0
    },
    percentage_P: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    bounce_B: {
        type: Number,
        min: -2,
        max: 2,
        default: 0
    },
    squeeze_Q: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    stroke_K: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    twoTimes_2: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    surroiunded_S: {
        type: Number,
        min: 0,
        max: 3,
        default: 0
    }
});

// Virtual for lateral's URL
LateralSchema.virtual("url").get(function () {
    return `/catalog/lateral/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Lateral", LateralSchema);