const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const hole = require("./hole");

const TeeSchema = new Schema({
    hole: [{
        type: Schema.Types.ObjectId,
        ref: "Hole",
        required: true
    }],
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength:12
    },
    length: {
        type: Number,
        required: true,
        min: 50,
        max: 700
    },
    par: {
        type: Number,
        required: true,
        min: 3,
        max: 6
    },
    altitude: {
        type: Number,
        required: true
    },
    ratingZone: [{
        type: Schema.Types.ObjectId,
        ref: "RatingZone",
        required: true
    }]
});

// Virtual for tee's URL
TeeSchema.virtual("url").get(function () {
    return `/catalog/tee/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Tee", TeeSchema);