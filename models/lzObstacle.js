const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LzObstacleSchema = new Schema({
    name: {
        type: String
    },
    layup: {
        type: Schema.Types.ObjectId,
        ref: "Layup",
        required: true
    },
    dogleg: {
        type: Schema.Types.ObjectId,
        ref: "Dogleg",
        required: true
    },
    roll: {
        type: Schema.Types.ObjectId,
        ref: "Roll",
        required: true
    },
    topo: {
        type: Schema.Types.ObjectId,
        ref: "Topo",
        required: true
    },
    fairway: {
        type: Schema.Types.ObjectId,
        ref: "Fairway",
        required: true
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
    bunker: {
        type: Schema.Types.ObjectId,
        ref: "Bunker",
        required: true
    },
    lateral: {
        type: Schema.Types.ObjectId,
        ref: "Lateral",
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

// Virtual for obstacle's URL
LzObstacleSchema.virtual("url").get(function (){
 return `/catalog/lzObstacle/${this._id}`;
});

// Export the model
module.exports = mongoose.model("LzObstacle", LzObstacleSchema);