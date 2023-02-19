const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HoleSchema = new Schema({
    course: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }],
    name: {
        type: Number,
        required: true
    },
    green: [{
        type: Schema.Types.ObjectId,
        ref: "Green",
        required: true
    }],
    tee: [{
        type: Schema.Types.ObjectId,
        ref: "Tee",
        required: true
    }]
});

// Virtual for hole's URL
HoleSchema.virtual("url").get(function () {
    return `/catalog/hole/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Hole", HoleSchema);