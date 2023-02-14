const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingZoneSchema = new Schema({
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
    obstacle: [{
        type: Schema.Types.ObjectId,
        ref: "Obstacle",
        required: true
    }]
});

// Virtual for rating zone's URL
RatingZoneSchema.virtual("url").get(function () {
    return `/catalog/ratingZone/${this._id}`;
});

// Export the model
module.exports = mongoose.model("RatingZone", RatingZoneSchema);