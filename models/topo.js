const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TopoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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