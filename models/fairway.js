const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FairwaySchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        default: 0
    },
    layup_L: {
        type: Number,
        min: -1,
        max: 0,
        default: 0
    },
    visibility_V: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    },
    width_W: {
        type: Number,
        min: -2,
        max: 2,
        default: 0
    },
    unpleasant_U: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    }
});

// Virtual for fairway's URL
FairwaySchema.virtual("url").get(function () {
    return `/catalog/fairway/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Fairway", FairwaySchema);