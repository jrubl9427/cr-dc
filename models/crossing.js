const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CrossingSchema = new Schema({
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
    carry_C: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    twoTimes_2: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    }
});

// Virtual for crossing's URL
CrossingSchema.virtual("url").get(function () {
    return `/catalog/crossing/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Crossing", CrossingSchema);