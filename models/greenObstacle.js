const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GreenObstacleSchema = new Schema({
    name: {
        type: String
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
    tree: {
        type: Schema.Types.ObjectId,
        ref: "Tree",
        required: true
    },
    surface: {
        type: Schema.Types.ObjectId,
        ref: "Surface",
        required: true
    }
});

// Virtual for obstacle's URL
GreenObstacleSchema.virtual("url").get(function (){
 return `/catalog/greenObstacle/${this._id}`;
});

// Export the model
module.exports = mongoose.model("GreenObstacle", GreenObstacleSchema);