const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    altitude: {
        type: Number,
        required: true,
        min: 0,
        max: 10000,
        default: 1000
    },
    wind: {
        type: Number,
        required: true,
        min: 0,
        max: 30,
        default: 0
    },
    grassType: {
        type: String,
        required: true,
        enum: ["CoolSeason", "WarmSeason"],
        default: "CoolSeason"
    },
    greenSpeed: {
        type: String,
        required: true,
        min: 6,
        max: 14,
        default: 10.5
    },
    roughHeight: {
        type: String,
        required: true,
        min: 0,
        max: 7,
        default: 2.5
    },
    hole: [{
        type: Schema.Types.ObjectId,
        ref: "Hole",
        required: true
    }]
});

// Virtual for formatting date
CourseSchema.virtual("date_formatted").get(function () {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

// Virtual for course's URL
CourseSchema.virtual("url").get(function () {
    return `/catalog/course/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Course", CourseSchema);