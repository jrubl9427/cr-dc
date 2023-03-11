const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DoglegSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    effectiveLengthAdjust: {
        type: Number,
        required: true,
        min: -50,
        max: 50
    },
    length: {
        type: Number,
        required: true,
        min: -50,
        max: 50
    }
});

// Virtual for dogleg's URL
DoglegSchema.virtual("url").get(function () {
    return `/catalog/dogleg/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Dogleg", DoglegSchema);