const mongoose = require("mongoose");
const obstacle = require("./obstacle");

const Schema = mongoose.Schema;

const RRSchema = new Schema({
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
    carry_C: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    layup_L: {
        type: Number,
        min: -1,
        max: 0,
        default: 0
    },
    inconsistent_I: {
        type: Number,
        min: -1,
        max: 1,
        default: 0
    },
    mounds_M: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    unpleasant_U: {
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
    parThree_3: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    surrounded_S: {
        type: Number,
        min: 0,
        max: 3,
        default: 0
    }
});

// Virtual for rR's URL
RRSchema.virtual("url").get(function () {
    return `/catalog/rR/${this._id}`;
});

// Export the model
module.exports = mongoose.model("RR", RRSchema);