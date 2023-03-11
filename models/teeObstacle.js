const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeeObstacleSchema = new Schema({
    name: {
        type: String
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: "Target",
        required: true
    },
    rR: {
        type: Schema.Types.ObjectId,
        ref: "RR",
        required: true
    },
    crossing: {
        type: Schema.Types.ObjectId,
        ref: "Crossing",
        required: true
    },
    tree: {
        type: Schema.Types.ObjectId,
        ref: "Tree",
        required: true
    }
});

// Virtual for TeeObstacle's URL
TeeObstacleSchema.virtual("url").get(function (){
 return `/catalog/teeObstacle/${this._id}`;
});

// Export the model
module.exports = mongoose.model("TeeObstacle", TeeObstacleSchema);