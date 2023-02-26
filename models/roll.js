const mongoose = require("mongoose");
const obstacle = require("./obstacle");

const Schema = mongoose.Schema;

const RollSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: -4,
        max: 4,
        default: 0
    },
    effectiveLengthAdjust: {
        type: Number,
        required: true
    },
    firm_F: {
        type: Number,
        min: -1,
        max: 1,
        default: 0
    },
    twoTimes_2: {
        type: Number,
        min: -1,
        max: 1,
        default: 0
    }
});

// Virtual for roll's URL
RollSchema.virtual("url").get(function () {
    return `/catalog/roll/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Roll", RollSchema);