const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HoleSchema = new Schema({
    name: {
        type: Number,
        required: true
    },
    tee: [{
        type: Schema.Types.ObjectId,
        ref: "Tee",
        required: true
    }],
    green: {
        type: Schema.Types.ObjectId,
        ref: "Green",
        required: true
    },
    lz: [{
        type: Schema.Types.ObjectId,
        ref: "Lz",
        required: true
    }]
});

// Virtual for hole's URL
HoleSchema.virtual("url").get(function () {
    return `/catalog/hole/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Hole", HoleSchema);