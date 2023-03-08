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
        min: -1,
        max: 1
    },
    squeeze_Q: {
        type: Number,
        min: 0,
        max: 2
    },
    stroke_K: {
        type: Number,
        min: 0,
        max: 1
    },
    twoTimes_2: {
        type: Number,
        min: 0,
        max: 2
    },
    surrounded_S: {
        type: Number,
        min: 0,
        max: 2
    }
});

// Virtual for lateral's URL
LateralSchema.virtual("url").get(function () {
    return `/catalog/lateral/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Lateral", LateralSchema);