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
const Lz = require("./models/lz");
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
    // await mongoose.connect("mongodb://mongo:o3opmtz5RRjeXvhNaBAG@containers-us-west-146.railway.app:5808", {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })
    // .then(() => console.log("Successfully connect to MongoDB."))
    // .catch(err => console.error("connection error", err));
}

const courses = [];
const holes = [];
const tees = [];
const greens = [];
const lzs = [];
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
            console.log(`ERROR SAVING COURSE: ${course}`)
            cb(err, null);
            return;
        }
        // console.log(`New Course: ${course}`);
        console.log(`New Course`);
        courses.push(course);
        cb(null, course);
    });
}

function holeCreate(name, tee, green, lz, cb) {
    holedetail = {
        name: name,
        tee: tee,
        green: green,
        lz: lz
    };
    const hole = new Hole(holedetail);
    hole.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING HOLE: ${hole}`)
            cb(err, null);
            return;
        }
        // console.log(`New Hole: ${hole}`);
        console.log(`New Hole`);
        holes.push(hole);
        cb(null, hole);
    });
}

function teeCreate(name, length, par, altitude, obstacle, cb) {
    teedetail = {
        name: name, 
        length: length, 
        par: par, 
        altitude: altitude,
        obstacle: obstacle
    };
    const tee = new Tee(teedetail);
    tee.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING TEE: ${tee}`)
            cb(err, null);
            return;
        }
        // console.log(`New Tee: ${tee}`);
        console.log(`New Tee`);
        tees.push(tee);
        cb(null, tee);
    });
}

function greenCreate(name, altitude, width, depth, obstacle, cb) {
    greendetail = {
        name: name, 
        altitude: altitude, 
        width: width, 
        depth: depth,
        obstacle: obstacle
    };
    const green = new Green(greendetail);
    green.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING GREEN: ${green}`)
            cb(err, null);
            return;
        }
        // console.log(`New Green: ${green}`);
        console.log(`New Green`);
        greens.push(green);
        cb(null, green);
    });
}

function lzCreate(name, altitude, distanceToGreen, obstacle, cb) {
    lzdetail = {
        name: name, 
        altitude: altitude,
        distanceToGreen: distanceToGreen,
        obstacle: obstacle
    };
    const lz = new Lz(lzdetail);
    lz.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING LZ: ${lz}`)
            cb(err, null);
            return;
        }
        // console.log(`New Lz: ${lz}`);
        console.log(`New Lz`);
        lzs.push(lz);
        cb(null, lz);
    });
}

function obstacleCreate(name, layup, dogleg, roll, topo, fairway, target, rR, bunker, lateral, crossing, tree, surface, cb) {
    obstacledetail = {
        name: name,
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
            console.log(`ERROR SAVING OBSTACLE: ${obstacle}`)
            cb(err, null);
            return;
        }
        // console.log(`New Obstacle: ${obstacle}`);
        console.log(`New Obstacle`);
        obstacles.push(obstacle);
        cb(null, obstacle);
    });
}

function layupCreate(name, effectiveLengthAdjust, length, typeLayup, cb) {
    layupdetail = {
        name: name,
        effectiveLengthAdjust: effectiveLengthAdjust, 
        length: length, 
        typeLayup: typeLayup
    };
    const layup = new Layup(layupdetail);
    layup.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING LAYUP: ${layup}`)
            cb(err, null);
            return;
        }
        // console.log(`New Layup: ${layup}`);
        console.log(`New Layup`);
        layups.push(layup);
        cb(null, layup);
    });
}

function doglegCreate(name, effectiveLengthAdjust, length, cb) {
    doglegdetail = {
        name: name,
        effectiveLengthAdjust: effectiveLengthAdjust, 
        length: length
    };
    const dogleg = new Dogleg(doglegdetail);
    dogleg.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING DOGLEG: ${dogleg}`)
            cb(err, null);
            return;
        }
        // console.log(`New Dogleg: ${dogleg}`);
        console.log(`New Dogleg`);
        doglegs.push(dogleg);
        cb(null, dogleg);
    });
}

function rollCreate(name, effectiveLengthAdjust, rating, firm_F, twoTimes_2, cb) {
    rolldetail = {
        name: name,
        effectiveLengthAdjust: effectiveLengthAdjust, 
        rating: rating, 
        firm_F: firm_F, 
        twoTimes_2: twoTimes_2
    };
    const roll = new Roll(rolldetail);
    roll.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING ROLL: ${roll}`)
            cb(err, null);
            return;
        }
        // console.log(`New Roll: ${roll}`);
        console.log(`New Roll`);
        rolls.push(roll);
        cb(null, roll);
    });
}

function topoCreate(name, rating, cb) {
    topodetail = {
        name: name,
        rating: rating
    };
    const topo = new Topo(topodetail);
    topo.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING TOPO: ${topo}`)
            cb(err, null);
            return;
        }
        // console.log(`New Topo: ${topo}`);
        console.log(`New Topo`);
        topos.push(topo);
        cb(null, topo);
    });
}

function fairwayCreate(name, rating, layup_L, visibility_V, width_W, unpleasant_U, cb) {
    fairwaydetail = {
        name: name,
        rating: rating, 
        layup_L: layup_L, 
        visibility_V: visibility_V, 
        width_W: width_W, 
        unpleasant_U: unpleasant_U
    };
    const fairway = new Fairway(fairwaydetail);
    fairway.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING FAIRWAY: ${fairway}`)
            cb(err, null);
            return;
        }
        // console.log(`New Fairway: ${fairway}`);
        console.log(`New Fairway`);
        fairways.push(fairway);
        cb(null, fairway);
    });
}

function targetCreate(name, rating, obstructed_O, visibility_V, cb) {
    targetdetail = {
        name: name,
        rating: rating, 
        obstructed_O: obstructed_O, 
        visibility_V: visibility_V
    };
    const target = new Target(targetdetail);
    target.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING TARGET: ${target}`)
            cb(err, null);
            return;
        }
        // console.log(`New Target: ${target}`);
        console.log(`New Target`);
        targets.push(target);
        cb(null, target);
    });
}

function rRCreate(name, rating, carry_C, layup_L, inconsistent_I, mounds_M, unpleasant_U, twoTimes_2, parThree_3, surrounded_S, cb) {
    rRdetail = {
        name: name,
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
            console.log(`ERROR SAVING RR: ${rR}`)
            cb(err, null);
            return;
        }
        // console.log(`New RR: ${rR}`);
        console.log(`New RR`);
        rRs.push(rR);
        cb(null, rR);
    });
}

function bunkerCreate(name, rating, bounce_B, carry_C, depth_D, extreme_E, no_N, squeeze_Q, cb) {
    bunkerdetail = {
        name: name,
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
            console.log(`ERROR SAVING BUNKER: ${bunker}`)
            cb(err, null);
            return;
        }
        // console.log(`New Bunker: ${bunker}`);
        console.log(`New Bunker`);
        bunkers.push(bunker);
        cb(null, bunker);
    });
}

function lateralCreate(name, rating, percentage_P, bounce_B, squeeze_Q, stroke_K, twoTimes_2, surrounded_S, cb) {
    lateraldetail = {
        name: name,
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
            console.log(`ERROR SAVING LATERAL: ${lateral}`)
            cb(err, null);
            return;
        }
        // console.log(`New Lateral: ${lateral}`);
        console.log(`New Lateral`);
        laterals.push(lateral);
        cb(null, lateral);
    });
}

function crossingCreate(name, rating, percentage_P, carry_C, twoTimes_2, cb) {
    crossingdetail = {
        name: name,
        rating: rating, 
        percentage_P: percentage_P,
        carry_C: carry_C, 
        twoTimes_2: twoTimes_2
    };
    const crossing = new Crossing(crossingdetail);
    crossing.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING CROSSING: ${crossing}`)
            cb(err, null);
            return;
        }
        // console.log(`New crossing: ${crossing}`);
        console.log(`New crossing`);
        crossings.push(crossing);
        cb(null, crossing);
    });
}

function treeCreate(name, rating, obstructed_O, chute_H, cb) {
    treedetail = {
        name: name,
        rating: rating, 
        obstructed_O: obstructed_O, 
        chute_H: chute_H
    };
    const tree = new Tree(treedetail);
    tree.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING TREE: ${tree}`)
            cb(err, null);
            return;
        }
        // console.log(`New Tree: ${tree}`);
        console.log(`New Tree`);
        trees.push(tree);
        cb(null, tree);
    });
}

function surfaceCreate(name, rating, tiered_T, firm_F, unpleasant_U, cb) {
    surfacedetail = {
        name: name,
        rating: rating, 
        tiered_T: tiered_T, 
        firm_F: firm_F, 
        unpleasant_U: unpleasant_U
    };
    const surface = new Surface(surfacedetail);
    surface.save(function (err) {
        if (err) {
            console.log(`ERROR SAVING SURFACE: ${surface}`)
            cb(err, null);
            return;
        }
        // console.log(`New Surface: ${surface}`);
        console.log(`New Surface`);
        surfaces.push(surface);
        cb(null, surface);
    });
}

function createCourses(cb) {
    async.series([
        function(callback) {
            courseCreate("VNCC", "2023-01-26", 345, 15, "CoolSeason", "10.4", "2.25", [holes[0], holes[1]], callback);
        },
    ], cb);
}

function createHoles(cb) {
    async.series([
        function(callback) {
            holeCreate(1, [tees[0], tees[1]], greens[0], [lzs[0]], callback);
        },
        function(callback) {
            holeCreate(2, [tees[2], tees[3]], greens[1], [lzs[1], lzs[2], lzs[3]], callback);
        },
    ], cb);
}

function createTees(cb) {
    async.series([
        function(callback) {
            teeCreate("Black-Men-1-Tee", 336, 4, 300, [obstacles[0]], callback);
        },
        function(callback) {
            teeCreate("Red-Women-1-Tee", 152, 4, 295, [obstacles[2]], callback);
        },
        function(callback) {
            teeCreate("Black-Men-2-Tee", 553, 5, 350, [obstacles[3]], callback);
        },
        function(callback) {
            teeCreate("Red-Women-2-Tee", 303, 5, 340, [obstacles[6]], callback);
        },
    ], cb);
}

function createGreens(cb) {
    async.series([
        function(callback) {
            greenCreate(1, 350, 28, 33, [obstacles[8]], callback);
        },
        function(callback) {
            greenCreate(2, 305, 25, 42, [obstacles[9]], callback);
        },
    ], cb);
}

function createLzs(cb) {
    async.series([
        function(callback) {
            lzCreate("Black-Men-1-Scratch-1", 350, 86, [obstacles[1]],  callback);
        },
        function(callback) {
            lzCreate("Black-Men-2-Scratch-1", 320, 303, [obstacles[4]],  callback);
        },
        function(callback) {
            lzCreate("Black-Men-2-Scratch-2", 305, 83, [obstacles[5]],  callback);
        },
        function(callback) {
            lzCreate("Red-Women-2-Scratch-1", 350, 164, [obstacles[7]],  callback);
        },
    ], cb);
}

function createObstacles(cb) {
    async.series([
        function(callback) {
            obstacleCreate("Black-Men-1-Tee", layups[0], doglegs[0], rolls [0], topos[0], fairways[0], targets[0], rRs[0], 
            bunkers[0], laterals[0], crossings[0], trees[0], surfaces[0], callback);
        },
        function(callback) {
            obstacleCreate("Black-Men-1-Scratch-1", layups[1], doglegs[1], rolls [1], topos[1], fairways[1], targets[1], rRs[1], 
            bunkers[1], laterals[1], crossings[1], trees[1], surfaces[1], callback);
        },
        function(callback) {
            obstacleCreate("Red-Women-1-Tee", layups[2], doglegs[2], rolls [2], topos[2], fairways[2], targets[2], rRs[2], 
            bunkers[2], laterals[2], crossings[2], trees[2], surfaces[2], callback);
        },
        function(callback) {
            obstacleCreate("Black-Men-2-Tee", layups[3], doglegs[3], rolls [3], topos[3], fairways[3], targets[3], rRs[3], 
            bunkers[3], laterals[3], crossings[3], trees[3], surfaces[3], callback);
        },
        function(callback) {
            obstacleCreate("Black-Men-2-Scratch-1", layups[4], doglegs[4], rolls [4], topos[4], fairways[4], targets[4], rRs[4], 
            bunkers[4], laterals[4], crossings[4], trees[4], surfaces[4], callback);
        },
        function(callback) {
            obstacleCreate("Black-Men-2-Scratch-2", layups[5], doglegs[5], rolls [5], topos[5], fairways[5], targets[5], rRs[5], 
            bunkers[5], laterals[5], crossings[5], trees[5], surfaces[5], callback);
        },
        function(callback) {
            obstacleCreate("Red-Women-2-Tee", layups[6], doglegs[6], rolls [6], topos[6], fairways[6], targets[6], rRs[6], 
            bunkers[6], laterals[6], crossings[6], trees[6], surfaces[6], callback);
        },
        function(callback) {
            obstacleCreate("Red-Women-2-Scratch-1", layups[7], doglegs[7], rolls [7], topos[7], fairways[7], targets[7], rRs[7], 
            bunkers[7], laterals[7], crossings[7], trees[7], surfaces[7], callback);
        },
        function(callback) {
            obstacleCreate("Green-1", layups[8], doglegs[8], rolls [8], topos[8], fairways[8], targets[8], rRs[8], 
            bunkers[8], laterals[8], crossings[8], trees[8], surfaces[8], callback);
        },
        function(callback) {
            obstacleCreate("Green-2", layups[9], doglegs[9], rolls [9], topos[9], fairways[9], targets[9], rRs[9], 
            bunkers[9], laterals[9], crossings[9], trees[9], surfaces[9], callback);
        }
    ], cb);
}

function createLayups(cb) {
    async.series([
        function(callback) {
            layupCreate("Black-Men-1-Tee layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("Black-Men-1-Scratch-1 layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("Red-Women-1-Tee layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("Black-Men-2-Tee layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("Black-Men-2-Scratch-1 layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("Black-Men-2-Scratch-2 layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("Red-Women-2-Tee layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("Red-Women-2-Scratch-1 layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("Green-1 layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("Green-2 layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("layup", 0, 0, "forced", callback);
        },
        function(callback) {
            layupCreate("layup", 0, 0, "forced", callback);
        }
    ], cb);
}

function createDoglegs(cb) {
    async.series([
        function(callback) {
            doglegCreate("Black-Men-1-Tee dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("Black-Men-1-Scratch-1 dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("Red-Women-1-Tee dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("Black-Men-2-Tee dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("Black-Men-2-Scratch-1 dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("Black-Men-2-Scratch-2 dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("Red-Women-2-Tee dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("Red-Women-2-Scratch-1 dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("Green-1 dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("Green-2 dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("dogleg", 0, 0, callback);
        },
        function(callback) {
            doglegCreate("dogleg", 0, 0, callback);
        }
    ], cb);
}

function createRolls(cb) {
    async.series([
        function(callback) {
            rollCreate("Black-Men-1-Tee roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("Black-Men-1-Scratch-1 roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("Red-Women-1-Tee roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("Black-Men-2-Tee roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("Black-Men-2-Scratch-1 roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("Black-Men-2-Scratch-2 roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("Red-Women-2-Tee roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("Red-Women-2-Scratch-1 roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("Green-1 roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("Green-2 roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate("roll", 0, 0, 0, 0, callback);
        },
        function(callback) {
            rollCreate( "roll", 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createTopos(cb) {
    async.series([
        function(callback) {
            topoCreate("Black-Men-1-Tee topo", 0, callback);
        },
        function(callback) {
            topoCreate("Black-Men-1-Scratch-1 topo", 0, callback);
        },
        function(callback) {
            topoCreate("Red-Women-1-Tee topo", 0, callback);
        },
        function(callback) {
            topoCreate("Black-Men-2-Tee topo", 0, callback);
        },
        function(callback) {
            topoCreate("Black-Men-2-Scratch-1 topo", 0, callback);
        },
        function(callback) {
            topoCreate("Black-Men-2-Scratch-2 topo", 0, callback);
        },
        function(callback) {
            topoCreate("Red-Women-2-Tee topo", 0, callback);
        },
        function(callback) {
            topoCreate("Red-Women-2-Scratch-1 topo", 0, callback);
        },
        function(callback) {
            topoCreate("Green-1 topo", 0, callback);
        },
        function(callback) {
            topoCreate("Green-2 topo", 0, callback);
        },
        function(callback) {
            topoCreate("topo", 0, callback);
        },
        function(callback) {
            topoCreate("topo", 0, callback);
        }
    ], cb);
}

function createFairways(cb) {
    async.series([
        function(callback) {
            fairwayCreate("Black-Men-1-Tee fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("Black-Men-1-Scratch-1 fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("Red-Women-1-Tee fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("Black-Men-2-Tee fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("Black-Men-2-Scratch-1 fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("Black-Men-2-Scratch-2 fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("Red-Women-2-Tee fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("Red-Women-2-Scratch-1 fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("Green-1 fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("Green-2 fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("fairway", 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            fairwayCreate("fairway", 0, 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createTargets(cb) {
    async.series([
        function(callback) {
            targetCreate("Black-Men-1-Tee target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("Black-Men-1-Scratch-1 target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("Red-Women-1-Tee target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("Black-Men-2-Tee target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("Black-Men-2-Scratch-1 target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("Black-Men-2-Scratch-2 target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("Red-Women-2-Tee target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("Red-Women-2-Scratch-1 target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("Green-1 target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("Green-2 target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("target", 0, 0, 0, callback);
        },
        function(callback) {
            targetCreate("target", 0, 0, 0, callback);
        }
    ], cb);
}

function createRRs(cb) {
    async.series([
        function(callback) {
            rRCreate("Black-Men-1-Tee rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("Black-Men-1-Scratch-1 rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("Red-Women-1-Tee rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("Black-Men-2-Tee rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("Black-Men-2-Scratch-1 rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("Black-Men-2-Scratch-2 rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("Red-Women-2-Tee rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("Red-Women-2-Scratch-1 rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("Green-1 rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("Green-2 rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            rRCreate("rR", 0, 0, 0, 0, 0, 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createBunkers(cb) {
    async.series([
        function(callback) {
            bunkerCreate("Black-Men-1-Tee bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("Black-Men-1-Scratch-1 bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("Red-Women-1-Tee bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("Black-Men-2-Tee bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("Black-Men-2-Scratch-1 bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("Black-Men-2-Scratch-2 bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("Red-Women-2-Tee bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("Red-Women-2-Scratch-1 bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("Green-1 bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("Green-2 bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            bunkerCreate("bunker", 0, 0, 0, 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createLaterals(cb) {
    async.series([
        function(callback) {
            lateralCreate("Black-Men-1-Tee lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("Black-Men-1-Scratch-1 lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("Red-Women-1-Tee lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("Black-Men-2-Tee lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("Black-Men-2-Scratch-1 lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("Black-Men-2-Scratch-2 lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("Red-Women-2-Tee lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("Red-Women-2-Scratch-1 lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("Green-1 lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("Green-2 lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        },
        function(callback) {
            lateralCreate("lateral", 0, 0, 0, 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createCrossings(cb) {
    async.series([
        function(callback) {
            crossingCreate("Black-Men-1-Tee crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("Black-Men-1-Scratch-1 crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("Red-Women-1-Tee crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("Black-Men-2-Tee crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("Black-Men-2-Scratch-1 crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("Black-Men-2-Scratch-2 crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("Red-Women-2-Tee crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("Red-Women-2-Scratch-1 crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("Green-1 crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("Green-2 crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("crossing", 0, 0, 0, 0, callback);
        },
        function(callback) {
            crossingCreate("crossing", 0, 0, 0, 0, callback);
        }
    ], cb);
}

function createTrees(cb) {
    async.series([
        function(callback) {
            treeCreate("Black-Men-1-Tee tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("Black-Men-1-Scratch-1 tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("Red-Women-1-Tee tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("Black-Men-2-Tee tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("Black-Men-2-Scratch-1 tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("Black-Men-2-Scratch-2 tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("Red-Women-2-Tee tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("Red-Women-2-Scratch-1 tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("Green-1 tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("Green-2 tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("tree", 0, 0, 0, callback);
        },
        function(callback) {
            treeCreate("tree", 0, 0, 0, callback);
        }
    ], cb);
}

function createSurfaces(cb) {
    async.series([
        function(callback) {
            surfaceCreate("Black-Men-1-Tee surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("Black-Men-1-Scratch-1 surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("Red-Women-1-Tee surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("Black-Men-2-Tee surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("Black-Men-2-Scratch-1 surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("Black-Men-2-Scratch-2 surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("Red-Women-2-Tee surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("Red-Women-2-Scratch-1 surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("Green-1 surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("Green-2 surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("surface", 0, 0, 0, 0, callback);
        },
        function(callback) {
            surfaceCreate("surface", 0, 0, 0, 0, callback);
        }
    ], cb);
}

async.series([
    createLayups,
    createDoglegs,
    createRolls,
    createTopos,
    createFairways,
    createTargets,
    createRRs,
    createBunkers,
    createLaterals,
    createCrossings,
    createTrees,
    createSurfaces,
    createObstacles,
    createTees,
    createGreens,
    createLzs,
    createHoles,
    createCourses
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

