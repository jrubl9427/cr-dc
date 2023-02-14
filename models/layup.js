const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LayupSchema = new Schema({
    effectiveLengthAdjust: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true,
        default: 0
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