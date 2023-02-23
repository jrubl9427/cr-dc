const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GreenSchema = new Schema({
    ratingZone: {
        type: Schema.Types.ObjectId,
        ref: "Hole",
        required: true
    },
    name: {
        type: Number,
        required: true
    },
    altitude: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    depth: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    greenObstacle: [{
        type: Schema.Types.ObjectId,
        ref: "Obstacle",
        required: true
    }]
});

// Virtual for diameter
GreenSchema.virtual("diameter").
    get(function () { 
        let diameter = (this.width+this.depth)/2;
    
        function between(x, min, max) {
            return x >= min && x <= max;
        }
    
        let ratio = this.width/this.depth;
        
        if (between(ratio, 0.01, 0.33)) {
            diameter = (this.width+this.width+this.width+this.depth)/4;
        }
        if (between(ratio, 0.34, 0.5)) {
            diameter = (this.width+this.width+this.depth)/3;
        }
        if (between(ratio, 2.1, 3.0)) {
            diameter = (this.width+this.depth+this.depth)/3;
        }
        if (between(ratio, 3.1, 10.0)) {
            diameter = (this.width+this.depth+this.depth+this.depth)/4;
        }
        return Math.round(diameter); 
    });
    

// Virtual for green's URL
GreenSchema.virtual("url").get(function () {
    return `/catalog/green/${this._id}`;
});

// Export the model
module.exports = mongoose.model("Green", GreenSchema);