const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DoglegSchema = new Schema({
    effectiveLengthAdjust: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true,
        default: 0
    }
});

// Virtual for dogleg's URL
DoglegSchema.virtual("url").get(function () {
    return `/catalog/dogleg/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Dogleg", DoglegSchema);