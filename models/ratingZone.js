const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingZoneSchema = new Schema({
    hole: {
        type: Schema.Types.ObjectId,
        ref: "Hole",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    distanceToGreen: {
        type: Number,
        required: true
    },
    altitude: {
        type: Number,
        required: true,
        default: 0
    },
    green: {
        type: Schema.Types.ObjectId,
        ref: "Green",
        required: true
    },
    tee: [{
        type: Schema.Types.ObjectId,
        ref: "Tee",
        required: true
    }],
    lz: [{
        type: Schema.Types.ObjectId,
        ref: "Lz",
        required: true
    }],
});

// Virtual for rating zone's URL
RatingZoneSchema.virtual("url").get(function () {
    return `/catalog/ratingZone/${this._id}`;
});

// Export the model
module.exports = mongoose.model("RatingZone", RatingZoneSchema);