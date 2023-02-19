#! /usr/bin/env node

console.log('This script populates a test course, and some holes, tees, greens, landing zones and obstacles to the database.')
console.log('Specified database as argument - e.g.: node populatem_t_mdb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/courseMTM?retryWrites=true&w=majority"');

// Get arguments passed on the command line
const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for mongoose 7
// const db = require("./models");
const Obstacle = require("./models/obstacle");
const Layup = require("./models/layup");
const async = require("async");

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {

    await mongoose.connect(mongoDB);
    // console.log("mongoose connected");
}

const createObstacle = function(obstacle) {
    return Obstacle.create(obstacle).then(docObstacle => {
        console.log("\n>> Created Obstacle:\n", docObstacle);
        return docObstacle;
    });
};

const createLayup = function(layup) {
    return Layup.create(layup).then(docLayup => {
        console.log("\n>> Created Layup:\n", docLayup);
        return docLayup;
    });
}

const addLayupToObstacle = function(obstacleId, layup) {
    return Obstacle.findByIdAndUpdate(
        obstacleId,
        { $push: { layups: layup._id } },
        { new: true, useFindAndModify: false }
    );
};

const addObstacleToLayup = function(layupId, obstacle) {
    return Layup.findByIdAndUpdate(
        layupId,
        { $push: { obstacles: obstacle._id } },
        { new: true, useFindAndModify: false }
    );
};

// const run = async function() {
    async function run(cb) {
    var obst1 = await createObstacle({
    });

    var layA = await createLayup({
        effectiveLengthAdjust: 0,
        length: 0,
        typeLayup: "forced"
    });

    var obstacle = await addLayupToObstacle(obst1._id, layA);
    console.log("\n>> obst1:\n", obstacle);

    var layup = await addObstacleToLayup(layA._id, obst1);
    console.log("\n>> layA:\n", layup);

    // obstacle.save(function (err) {
    //     if (err) {
    //         console.log(`ERROR SAVING: ${obstacle}`)
    //         return;
    //     }
    //     console.log("\n>> obstacle saved:\n", obstacle);
    // });

    // layup.save(function (err) {
    //     if (err) {
    //         console.log(`ERROR SAVING: ${layup}`)
    //         return;
    //     }
    //     console.log("\n>> layup saved:\n", layup);
    // });
};
async.series([
    run
],
function (err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    else {
        console.log('Results: ' + results);

    }
    // All done, disconnect from database
    mongoose.connection.close();
}
);




