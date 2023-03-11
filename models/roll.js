const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RollSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: -10,
        max: 10,
    },
    effectiveLengthAdjust: {
        type: Number,
        required: true,
        min: -20,
        max: 20
    },
    firm_F: {
        type: Number,
        min: -1,
        max: 1,
    },
    twoTimes_2: {
        type: Number,
        min: -1,
        max: 1,
    }
});

// Virtual for roll's URL
RollSchema.virtual("url").get(function () {
    return `/catalog/roll/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Roll", RollSchema);