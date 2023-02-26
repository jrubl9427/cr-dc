const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LzSchema = new Schema({
    name: {
        type: String,
        required: true,
        // minLength: 1,
        // maxLength:12
    },
    altitude: {
        type: Number,
        required: true
    },
    distanceToGreen: {
        type: Number,
        required: true
    },
    obstacle: [{
        type: Schema.Types.ObjectId,
        ref: "Obstacle",
        required: true
    }]
});

// Virtual for tee's URL
LzSchema.virtual("url").get(function () {
    return `/catalog/tee/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Lz", LzSchema);