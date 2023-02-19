const mongoose = require("mongoose");
const obstacle = require("./obstacle");

const Schema = mongoose.Schema;

const TopoSchema = new Schema({
    obstacle: [{
        type: Schema.Types.ObjectId,
        ref: "Obstacle",
        required: true
    }],
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        default: 0
    }
});

// Virtual for topo's URL
TopoSchema.virtual("url").get(function () {
    return `/catalog/topo/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Topo", TopoSchema);