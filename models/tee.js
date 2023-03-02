const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        // minLength: 1,
        // maxLength:12
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
    obstacle: [{
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