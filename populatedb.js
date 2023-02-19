#! /usr/bin/env node

console.log('This script populates a test course, and some holes, tees, greens, landing zones and obstacles to the database.')
console.log('Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/course?retryWrites=true&w=majority"');

// Get arguments passed on the command line
const userArgs = process.argv.slice(2);

const async = require("async");
const Course = require("./models/course");
const Hole = require("./models/hole");
const Tee = require("./models/tee");
const Green = require("./models/green");
const RatingZone = require("./models/ratingZone");
const Obstacle = require("./models/obstacle");
const Layup = require("./models/layup");
const Dogleg = require("./models/dogleg");
const Roll = require("./models/roll");
const Topo = require("./models/topo");
const Fairway = require("./models/fairway");
const Target = require("./models/target");
const RR = require("./models/rR");
const Bunker = require("./models/bunker");
const Lateral = require("./models/lateral");
const Crossing = require("./models/crossing");
const Tree = require("./models/tree");
const Surface = require("./models/surface");


const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const courses = [];
const holes = [];
const tees = [];
const greens = [];
const ratingZones = [];
const obstacles = [];
const layups = [];
const doglegs = [];
const rolls = [];
const topos = [];
const fairways = [];
const targets = [];
const rRs = [];
const bunkers = [];
const laterals = [];
const crossings = [];
const trees = [];
const surfaces = [];

function courseCreate(name, date, altitude, wind, grassType, greenSpeed, roughHeight, hole, cb) {
    coursedetail = {
        name: name, 
        date: date, 
        altitude: altitude, 
        wind: wind, 
        grassType: grassType, 
        greenSpeed: greenSpeed, 
        roughHeight: roughHeight, 
        hole: hole
    };
    const course = new Course(coursedetail);
    course.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${course}`)
            cb(err, null);
            return;
        }
        // console.log(`New Course: ${course}`);
        courses.push(course);
        cb(null, course);
    });
}

function holeCreate(course, name, green, tee, cb) {
    holedetail = {
        course: course,
        name: name,
        green: green,
        tee: tee
    };
    const hole = new Hole(holedetail);
    hole.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${hole}`)
            cb(err, null);
            return;
        }
        // console.log(`New Hole: ${hole}`);
        holes.push(hole);
        cb(null, hole);
    });
}

function teeCreate(name, length, par, altitude, ratingZone, cb) {
    teedetail = {
        name: name, 
        length: length, 
        par: par, 
        altitude: altitude,
        ratingZone: ratingZone
    };
    const tee = new Tee(teedetail);
    tee.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${tee}`)
            cb(err, null);
            return;
        }
        // console.log(`New Tee: ${tee}`);
        tees.push(tee);
        cb(null, tee);
    });
}

function greenCreate(hole, name, altitude, width, depth, ratingZone, cb) {
    greendetail = {
        hole: hole,
        name: name, 
        altitude: altitude, 
        width: width, 
        depth: depth,
        ratingZone: ratingZone
    };
    const green = new Green(greendetail);
    green.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${green}`)
            cb(err, null);
            return;
        }
        // console.log(`New Green: ${green}`);
        greens.push(green);
        cb(null, green);
    });
}

function ratingZoneCreate(name, distanceToGreen, altitude, obstacle, cb) {
    ratingZonedetail = {
        name: name, 
        distanceToGreen: distanceToGreen, 
        altitude: altitude,
        obstacle: obstacle
    };
    const ratingZone = new RatingZone(ratingZonedetail);
    ratingZone.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${ratingZone}`)
            cb(err, null);
            return;
        }
        // console.log(`New RatingZone: ${ratingZone}`);
        ratingZones.push(ratingZone);
        cb(null, ratingZone);
    });
}

function obstacleCreate(layup, dogleg, roll, topo, fairway, target, rR, bunker, lateral, crossing, tree, surface, cb) {
    obstacledetail = {
        layup: layup,
        dogleg: dogleg, 
        roll: roll, 
        topo: topo,
        fairway: fairway,
        target: target,
        rR: rR,
        bunker: bunker,
        lateral: lateral,
        crossing: crossing,
        tree: tree,
        surface: surface
    };
    const obstacle = new Obstacle(obstacledetail);
    obstacle.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${obstacle}`)
            cb(err, null);
            return;
        }
        console.log(`New Obstacle: ${obstacle}`);
        obstacles.push(obstacle);
        cb(null, obstacle);
    });
}

function layupCreate(obstacle, effectiveLengthAdjust, length, typeLayup, cb) {
    layupdetail = {
        obstacle: obstacle,
        effectiveLengthAdjust: effectiveLengthAdjust, 
        length: length, 
        typeLayup: typeLayup
    };
    const layup = new Layup(layupdetail);
    Layup.findByIdAndUpdate(layup._id,
        { $push: { obstacles: obstacle._id } },
        { new: true, useFindAndModify: false }
    );
    layup.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${layup}`)
            cb(err, null);
            return;
        }
        console.log(`New Layup: ${layup}`);
        layups.push(layup);
        cb(null, layup);
    });
}

function doglegCreate(obstacle, effectiveLengthAdjust, length, cb) {
    doglegdetail = {
        obstacle: obstacle,
        effectiveLengthAdjust: effectiveLengthAdjust, 
        length: length
    };
    const dogleg = new Dogleg(doglegdetail);
    dogleg.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${dogleg}`)
            cb(err, null);
            return;
        }
        // console.log(`New Dogleg: ${dogleg}`);
        doglegs.push(dogleg);
        cb(null, dogleg);
    });
}

function rollCreate(obstacle, effectiveLengthAdjust, rating, firm_F, twoTimes_2, cb) {
    rolldetail = {
        obstacle: obstacle,
        effectiveLengthAdjust: effectiveLengthAdjust, 
        rating: rating, 
        firm_F: firm_F, 
        twoTimes_2: twoTimes_2
    };
    const roll = new Roll(rolldetail);
    roll.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${roll}`)
            cb(err, null);
            return;
        }
        // console.log(`New Roll: ${roll}`);
        rolls.push(roll);
        cb(null, roll);
    });
}

function topoCreate(obstacle, rating, cb) {
    topodetail = {
        obstacle: obstacle,
        rating: rating
    };
    const topo = new Topo(topodetail);
    topo.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${topo}`)
            cb(err, null);
            return;
        }
        // console.log(`New Topo: ${topo}`);
        topos.push(topo);
        cb(null, topo);
    });
}

function fairwayCreate(obstacle, rating, layup_L, visibility_V, width_W, unpleasant_U, cb) {
    fairwaydetail = {
        obstacle: obstacle,
        rating: rating, 
        layup_L: layup_L, 
        visibility_V: visibility_V, 
        width_W: width_W, 
        unpleasant_U: unpleasant_U
    };
    const fairway = new Fairway(fairwaydetail);
    fairway.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${fairway}`)
            cb(err, null);
            return;
        }
        // console.log(`New Fairway: ${fairway}`);
        fairways.push(fairway);
        cb(null, fairway);
    });
}

function targetCreate(obstacle, rating, obstructed_O, visibility_V, cb) {
    targetdetail = {
        obstacle: obstacle,
        rating: rating, 
        obstructed_O: obstructed_O, 
        visibility_V: visibility_V
    };
    const target = new Target(targetdetail);
    target.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${target}`)
            cb(err, null);
            return;
        }
        // console.log(`New Target: ${target}`);
        targets.push(target);
        cb(null, target);
    });
}

function rRCreate(obstacle, rating, carry_C, layup_L, inconsistent_I, mounds_M, unpleasant_U, twoTimes_2, parThree_3, surrounded_S, cb) {
    rRdetail = {
        obstacle: obstacle,
        rating: rating,
        carry_C: carry_C,
        layup_L: layup_L, 
        inconsistent_I: inconsistent_I, 
        mounds_M: mounds_M, 
        unpleasant_U: unpleasant_U,
        twoTimes_2: twoTimes_2,
        parThree_3: parThree_3,
        surrounded_S: surrounded_S
    };
    const rR = new RR(rRdetail);
    rR.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${rR}`)
            cb(err, null);
            return;
        }
        // console.log(`New RR: ${rR}`);
        rRs.push(rR);
        cb(null, rR);
    });
}

function bunkerCreate(obstacle, rating, bounce_B, carry_C, depth_D, extreme_E, no_N, squeeze_Q, cb) {
    bunkerdetail = {
        obstacle: obstacle,
        rating: rating,
        bounce_B: bounce_B, 
        carry_C: carry_C, 
        depth_D: depth_D, 
        extreme_E: extreme_E, 
        no_N: no_N,
        squeeze_Q: squeeze_Q
    };
    const bunker = new Bunker(bunkerdetail);
    bunker.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${bunker}`)
            cb(err, null);
            return;
        }
        // console.log(`New Bunker: ${bunker}`);
        bunkers.push(bunker);
        cb(null, bunker);
    });
}

function lateralCreate(obstacle, rating, percentage_P, bounce_B, squeeze_Q, stroke_K, twoTimes_2, surrounded_S, cb) {
    lateraldetail = {
        obstacle: obstacle,
        rating: rating, 
        percentage_P: percentage_P, 
        bounce_B: bounce_B, 
        squeeze_Q: squeeze_Q, 
        stroke_K: stroke_K,
        twoTimes_2: twoTimes_2,
        surrounded_S: surrounded_S
    };
    const lateral = new Lateral(lateraldetail);
    lateral.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${lateral}`)
            cb(err, null);
            return;
        }
        // console.log(`New Lateral: ${lateral}`);
        laterals.push(lateral);
        cb(null, lateral);
    });
}

function crossingCreate(obstacle, rating, percentage_P, carry_C, twoTimes_2, cb) {
    crossingdetail = {
        obstacle: obstacle,
        rating: rating, 
        percentage_P: percentage_P,
        carry_C: carry_C, 
        twoTimes_2: twoTimes_2
    };
    const crossing = new Crossing(crossingdetail);
    crossing.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${crossing}`)
            cb(err, null);
            return;
        }
        // console.log(`New crossing: ${crossing}`);
        crossings.push(crossing);
        cb(null, crossing);
    });
}

function treeCreate(obstacle, rating, obstructed_O, chute_H, cb) {
    treedetail = {
        obstacle: obstacle,
        rating: rating, 
        obstructed_O: obstructed_O, 
        chute_H: chute_H
    };
    const tree = new Tree(treedetail);
    tree.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${tree}`)
            cb(err, null);
            return;
        }
        // console.log(`New Tree: ${tree}`);
        trees.push(tree);
        cb(null, tree);
    });
}

function surfaceCreate(obstacle, rating, tiered_T, firm_F, unpleasant_U, cb) {
    surfacedetail = {
        obstacle: obstacle,
        rating: rating, 
        tiered_T: tiered_T, 
        firm_F: firm_F, 
        unpleasant_U: unpleasant_U
    };
    const surface = new Surface(surfacedetail);
    surface.save(function (err) {
        if (err) {
            console.log(`ERROR CREATING: ${surface}`)
            cb(err, null);
            return;
        }
        // console.log(`New Surface: ${surface}`);
        surfaces.push(surface);
        cb(null, surface);
    });
}

function createCourses(cb) {
    async.parallel([
        function(callback) {
            courseCreate("VNCC", "2023-01-26", 345, 15, "CoolSeason", "10.4", "2.25", [holes[0], holes[1]], callback);
        },
    ], cb);
}

function createHoles(cb) {
    async.parallel([
        function(callback) {
            holeCreate(courses[0], 1, greens[0], [tees[0], tees[1]], callback);
        },
        function(callback) {
            holeCreate(courses[0], 2, greens[1], [tees[0], tees[1]], callback);
        },
    ], cb);
}

function createTees(cb) {
    async.parallel([
        function(callback) {
            teeCreate("Black-Men", 336, 4, 300, [ratingZones[0], ratingZones[1]],callback);
        },
        function(callback) {
            teeCreate("Red-Women", 152, 4, 295, ratingZones[2], callback);
        },
        function(callback) {
            teeCreate("Black-Men", 553, 5, 350, [ratingZones[3], ratingZones[4], ratingZones[5]], callback);
        },
        function(callback) {
            teeCreate("Red-Women", 303, 5, 340, [ratingZones[6], ratingZones[7]], callback);
        },
    ], cb);
}

function createGreens(cb) {
    async.parallel([
        function(callback) {
            greenCreate(holes[1], 2, 350, 28, 33, [ratingZones[8],ratingZones[9]], callback);
        },
        function(callback) {
            greenCreate(holes[0], 1, 305, 25, 42, [ratingZones[10], ratingZones[11]],callback);
        },
    ], cb);
}

function createRatingZones(cb) {
    async.parallel([
        function(callback) {
            ratingZoneCreate("Black-Men-1-Scratch-Tee", 326, 305, obstacles[0], callback);
        },
        function(callback) {
            ratingZoneCreate("Black-Men-1-Scratch-1", 86, 340, obstacles[1], callback);
        },
        function(callback) {
            ratingZoneCreate("Red-Women-1-Scratch-Tee", 152, 310, obstacles[2], callback);
        },
        function(callback) {
            ratingZoneCreate("Black-Men-2-Scratch-Tee", 553, 340, obstacles[3], callback);
        },
        function(callback) {
            ratingZoneCreate("Black-Men-2-Scratch-1", 303, 320, obstacles[4], callback);
        },
        function(callback) {
            ratingZoneCreate("Black-Men-2-Scratch-2", 83, 305, obstacles[5], callback);
        },
        function(callback) {
            ratingZoneCreate("Red-Women-2-Scratch-Tee", 374, 330, obstacles[6], callback);
        },
        function(callback) {
            ratingZoneCreate("Red-Women-2-Scratch-1", 164, 310, obstacles[7], callback);
        },
        function(callback) {
            ratingZoneCreate("Men-Scratch-1-Green", 0, 295, obstacles[8], callback);
        },
        function(callback) {
            ratingZoneCreate("Women-Scratch-1-Green", 0, 295, obstacles[9], callback);
        },
        function(callback) {
            ratingZoneCreate("Men-Scratch-2-Green", 0, 295, obstacles[10], callback);
        },
        function(callback) {
            ratingZoneCreate("Women-Scratch-2-Green", 0, 295, obstacles[11], callback);
        },
    ], cb);
}

function createObstacles(cb) {
    async.series([
        function(callback) {
            obstacleCreate(layups[0], doglegs[0], rolls [0], topos[0], fairways[0], targets[0], rRs[0], 
            bunkers[0], laterals[0], crossings[0], trees[0], surfaces[0], callback);
        },
        function(callback) {
            obstacleCreate(layups[1], doglegs[1], rolls [1], topos[1], fairways[1], targets[1], rRs[1], 
            bunkers[1], laterals[1], crossings[1], trees[1], surfaces[1], callback);
        },
        function(callback) {
            obstacleCreate(layups[2], doglegs[2], rolls [2], topos[2], fairways[2], targets[2], rRs[2], 
            bunkers[2], laterals[2], crossings[2], trees[2], surfaces[2], callback);
        },
        function(callback) {
            obstacleCreate(layups[3], doglegs[3], rolls [3], topos[3], fairways[3], targets[3], rRs[3], 
            bunkers[3], laterals[3], crossings[3], trees[3], surfaces[3], callback);
        },
        function(callback) {
            obstacleCreate(layups[4], doglegs[4], rolls [4], topos[4], fairways[4], targets[4], rRs[4], 
            bunkers[4], laterals[4], crossings[4], trees[4], surfaces[4], callback);
        },
        function(callback) {
            obstacleCreate(layups[5], doglegs[5], rolls [5], topos[5], fairways[5], targets[5], rRs[5], 
            bunkers[5], laterals[5], crossings[5], trees[5], surfaces[5], callback);
        },
        function(callback) {
            obstacleCreate(layups[6], doglegs[6], rolls [6], topos[6], fairways[6], targets[6], rRs[6], 
            bunkers[6], laterals[6], crossings[6], trees[6], surfaces[6], callback);
        },
        function(callback) {
            obstacleCreate(layups[7], doglegs[7], rolls [7], topos[7], fairways[7], targets[7], rRs[7], 
            bunkers[7], laterals[7], crossings[7], trees[7], surfaces[7], callback);
        },
        function(callback) {
            obstacleCreate(layups[8], doglegs[8], rolls [8], topos[8], fairways[8], targets[8], rRs[8], 
            bunkers[8], laterals[8], crossings[8], trees[8], surfaces[8], callback);
        },
        function(callback) {
            obstacleCreate(layups[9], doglegs[9], rolls [9], topos[9], fairways[9], targets[9], rRs[9], 
            bunkers[9], laterals[9], crossings[9], trees[9], surfaces[9], callback);
        },
        function(callback) {
            obstacleCreate(layups[10], doglegs[10], rolls [10], topos[10], fairways[10], targets[10], rRs[10], 
            bunkers[10], laterals[10], crossings[10], trees[10], surfaces[10], callback);
        },
        function(callback) {
            obstacleCreate(layups[11], doglegs[11], rolls [11], topos[11], fairways[11], targets[11], rRs[11], 
            bunkers[11], laterals[11], crossings[11], trees[11], surfaces[11], callback);
        },
    ], cb);
}

function createLayups(cb) {
    async.series([
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate(0, 0, "forced", callback);
        }
    ], cb);
}

function createDoglegs(cb) {
    async.series([
        function(callback) {
            doglegCreate(obstacles[0], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[1], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[2], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[3], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[4], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[5], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[6], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[7], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[8], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[9], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[10], 0, callback);
        },
        function(callback) {
            doglegCreate(obstacles[11], 0, callback);
        }
    ], cb);
}

function createRolls(cb) {
    async.series([
        function(callback) {
            rollCreate(obstacles[0], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[1], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[2], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[3], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[4], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[5], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[6], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[7], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[8], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[9], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[10], 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate(obstacles[11], 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createTopos(cb) {
    async.series([
        function(callback) {
            topoCreate(obstacles[0], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[1], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[2], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[3], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[4], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[5], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[6], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[7], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[8], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[9], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[10], 0, callback);
        },
        function(callback) {
            topoCreate(obstacles[11], 0, callback);
        }
    ], cb);
}

function createFairways(cb) {
    async.series([
        function(callback) {
            fairwayCreate(obstacles[0], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[1], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[2], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[3], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[4], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[5], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[6], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[7], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[8], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[9], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[10], 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate(obstacles[11], 0, 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createTargets(cb) {
    async.series([
        function(callback) {
            targetCreate(obstacles[0], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[1], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[2], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[3], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[4], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[5], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[6], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[7], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[8], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[9], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[10], 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate(obstacles[11], 0, 0, 0, callback);
        }
    ], cb);
}

function createRRs(cb) {
    async.series([
        function(callback) {
            rRCreate(obstacles[0], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[1], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[2], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[3], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[4], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[5], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[6], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[7], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[8], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[9], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[10], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate(obstacles[11], 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createBunkers(cb) {
    async.series([
        function(callback) {
            bunkerCreate(obstacles[0], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[1], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[2], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[3], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[4], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[5], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[6], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[7], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[8], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[9], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[10], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate(obstacles[11], 0, 0, 0, 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createLaterals(cb) {
    async.series([
        function(callback) {
            lateralCreate(obstacles[0], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[1], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[2], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[3], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[4], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[5], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[6], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[7], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[8], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[9], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[10], 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate(obstacles[11], 0, 0, 0, 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createCrossings(cb) {
    async.series([
        function(callback) {
            crossingCreate(obstacles[0], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[1], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[2], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[3], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[4], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[5], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[6], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[7], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[8], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[9], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[10], 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate(obstacles[11], 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createTrees(cb) {
    async.series([
        function(callback) {
            treeCreate(obstacles[0], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[1], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[2], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[3], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[4], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[5], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[6], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[7], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[8], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[9], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[10], 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate(obstacles[11], 0, 0, 0, callback);
        }
    ], cb);
}

function createSurfaces(cb) {
    async.series([
        function(callback) {
            surfaceCreate(obstacles[0], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[1], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[2], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[3], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[4], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[5], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[6], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[7], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[8], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[9], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[10], 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate(obstacles[11], 0, 0, 0, 0, callback);
        }
    ], cb);
}

async.series([
    createLayups,
    // createDoglegs,
    // createRolls,
    // createTopos,
    // createFairways,
    // createTargets,
    // createRRs,
    // createBunkers,
    // createLaterals,
    // createCrossings,
    // createTrees,
    // createSurfaces,
    createObstacles,
    // createRatingZones,
    // createGreens,
    // createTees,
    // createHoles,
    // createCourses
],
// Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Courses: ' + courses);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);

