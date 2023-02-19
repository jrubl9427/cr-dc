const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const obstacle = require("./obstacle");

const DoglegSchema = new Schema({
    obstacle: [{
    type: Schema.Types.ObjectId,
    ref: "Obstacle",
    required: true
    }],
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