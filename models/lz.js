const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LzSchema = new Schema({
    ratingZone: {
        type: Schema.Types.ObjectId,
        ref: "RatingZone",
        required: true
    },
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength:12
    },
    altitude: {
        type: Number,
        required: true
    },
    lzObstacle: [{
        type: Schema.Types.ObjectId,
        ref: "Obstacle",
        required: true
    }]
});

// Virtual for tee's URL
TeeSchema.virtual("url").get(function () {
    return `/catalog/tee/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Tee", TeeSchema);