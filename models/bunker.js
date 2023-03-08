const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BunkerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    carry_C: {
        type: Number,
        min: 0,
        max: 1,
    },
    depth_D: {
        type: Number,
        min: 0,
        max: 4,
    },
    extreme_E: {
        type: Number,
        min: 0,
        max: 2,
    },
    no_N: {
        type: Number,
        min: -1,
        max: 0,
    },
    squeeze_Q: {
        type: Number,
        min: 0,
        max: 2,
    },
    twoTimes_2: {
        type: Number,
        min: 0,
        max: 1,
    }
});

// Virtual for bunker's URL
BunkerSchema.virtual("url").get(function () {
    return `/catalog/bunker/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Bunker", BunkerSchema);