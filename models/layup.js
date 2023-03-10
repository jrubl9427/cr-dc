const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LayupSchema = new Schema({
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
    },
    typeLayup: {
        type: String,
        required: true,
        enum: ["forced", "choice"],
        default: "forced"
    }
});

// Virtual for layup's URL
LayupSchema.virtual("url").get(function () {
    return `/catalog/layup/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Layup", LayupSchema);