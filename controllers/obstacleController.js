// obstacleController.js

const Obstacle = require("../models/obstacle");
const Layup = require("../models/layup");
const Dogleg = require("../models/dogleg");
const Roll = require("../models/roll");
const Topo = require("../models/topo");
const Fairway = require("../models/fairway");
const Target = require("../models/target");
const RR = require("../models/rR");
const Bunker = require("../models/bunker");
const Lateral = require("../models/lateral");
const Crossing = require("../models/crossing");
const Tree = require("../models/tree");
const Surface = require("../models/surface");
const async = require("async");
const { body, validationResult } = require("express-validator");
const { ObjectID, ObjectId } = require("bson");

// Display a list of all obstacles.
exports.obstacle_list = (req, res, next) => {
    Obstacle.find({})
        .sort({ name: 1 })
        .exec(function (err, list_obstacles) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("obstacle_list", {
                    title: "Obstacle List",
                    obstacle_list: list_obstacles
                });
            }
        });
};

// Display detail page for a specific obstacle.
exports.obstacle_detail = (req, res, next) => {
    async.parallel(
        {
            obstacle(callback) {
                Obstacle.findById(req.params.id)
                    .populate("layup")
                    .populate("dogleg")
                    .populate("roll")
                    .populate("topo")
                    .populate("fairway")
                    .populate("target")
                    .populate("rR")
                    .populate("bunker")
                    .populate("lateral")
                    .populate("crossing")
                    .populate("tree")
                    .populate("surface")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.obstacle == null) {
                // No, results
                const err = new Error("Obstacle not found");
                err.status = 404;
                return next(err);
            }
            res.render("obstacle_detail", {
                title: results.obstacle.name,
                obstacle: results.obstacle
            });
        }
    );
};

// Display obstacle create form on GET.
exports.obstacle_create_get = (req, res, next) => {
    // Get all tees, lzs and greens .
    async.parallel(
        {
            layups(callback) {
                Layup.find(callback);
            },
            doglegs(callback) {
                Dogleg.find(callback);
            },
            rolls(callback) {
                Roll.find(callback);
            },
            topos(callback) {
                Topo.find(callback);
            },
            fairways(callback) {
                Fairway.find(callback);
            },
            targets(callback) {
                Target.find(callback);
            },
            rRs(callback) {
                RR.find(callback);
            },
            bunkers(callback) {
                Bunker.find(callback);
            },
            laterals(callback) {
                Lateral.find(callback);
            },
            crossings(callback) {
                Crossing.find(callback);
            },
            trees(callback) {
                Tree.find(callback);
            },
            surfaces(callback) {
                Surface.find(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render("obstacle_form", {
                title: "Create Obstacle",
                layups: results.layups,
                doglegs: results.doglegs,
                rolls: results.rolls,
                topos: results.topos,
                fairways: results.fairways,
                targets: results.targets,
                rRs: results.rRs,
                bunkers: results.bunkers,
                laterals: results.laterals,
                crossings: results.crossings,
                trees: results.trees,
                surfaces: results.surfaces,
            });
        }
    );
};

// Handle obstacle create on POST.
exports.obstacle_create_post = [
    // Convert obstacles to arrays.
    (req, res, next) => {
        if (!Array.isArray(req.body.layup)) {
            req.body.layup = typeof req.body.layup === "undefined" ? [] : [req.body.layup];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.dogleg)) {
            req.body.dogleg = typeof req.body.dogleg === "undefined" ? [] : [req.body.dogleg];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.roll)) {
            req.body.roll = typeof req.body.roll === "undefined" ? [] : [req.body.roll];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.topo)) {
            req.body.topo = typeof req.body.topo === "undefined" ? [] : [req.body.topo];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.fairway)) {
            req.body.fairway = typeof req.body.fairway === "undefined" ? [] : [req.body.fairway];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.target)) {
            req.body.target = typeof req.body.target === "undefined" ? [] : [req.body.target];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.rR)) {
            req.body.rR = typeof req.body.rR === "undefined" ? [] : [req.body.rR];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.bunker)) {
            req.body.bunker = typeof req.body.bunker === "undefined" ? [] : [req.body.bunker];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.lateral)) {
            req.body.lateral = typeof req.body.lateral === "undefined" ? [] : [req.body.lateral];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.crossing)) {
            req.body.crossing = typeof req.body.crossing === "undefined" ? [] : [req.body.crossing];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.tree)) {
            req.body.tree = typeof req.body.tree === "undefined" ? [] : [req.body.tree];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.surface)) {
            req.body.surface = typeof req.body.surface === "undefined" ? [] : [req.body.surface];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({min: 1 }).escape(),
    body("layup.*").escape(),
    body("dogleg.*").escape(),
    body("roll.*").escape(),
    body("topo.*").escape(),
    body("fairway.*").escape(),
    body("target.*").escape(),
    body("rR.*").escape(),
    body("bunker.*").escape(),
    body("lateral.*").escape(),
    body("crossing.*").escape(),
    body("tree.*").escape(),
    body("surface.*").escape(),

    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Obstacle object with escaped and trimmed data.
        const obstacle = new Obstacle({
            name: req.body.name,
            layup: req.body.layup,
            dogleg: req.body.dogleg,
            roll: req.body.roll,
            topo: req.body.topo,
            fairway: req.body.fairway,
            target: req.body.target,
            rR: req.body.rR,
            bunker: req.body.bunker,
            lateral: req.body.lateral,
            crossing: req.body.crossing,
            tree: req.body.tree,
            surface: req.body.surface,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all obstacles for form.
            
            // Get all obstacles for the form
            async.parallel(
                {
                    layups(callback) {
                        Layup.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    doglegs(callback) {
                        Dogleg.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    rolls(callback) {
                        Roll.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    topos(callback) {
                        Topo.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    fairways(callback) {
                        Fairway.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    targets(callback) {
                        Target.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    rRs(callback) {
                        RR.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    bunkers(callback) {
                        Bunker.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    laterals(callback) {
                        Lateral.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    crossings(callback) {
                        Crossing.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    trees(callback) {
                        Tree.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    surfaces(callback) {
                        Surface.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }

                    // Mark selected layups as checked and render.
                    for (const layup of results.layups) {
                        if (obstacle.layup.includes(layup._id)) {
                            layup.checked = "true";
                        }
                    }
                    // Mark selected doglegs as checked and render.
                    for (const dogleg of results.doglegs) {
                        if (obstacle.dogleg.includes(dogleg._id)) {
                            dogleg.checked = "true";
                        }
                    }
                    // Mark selected rolls as checked and render.
                    for (const roll of results.rolls) {
                        if (obstacle.roll.includes(roll._id)) {
                            roll.checked = "true";
                        }
                    }
                    // Mark selected topos as checked and render.
                    for (const topo of results.topos) {
                        if (obstacle.topo.includes(topo._id)) {
                            topo.checked = "true";
                        }
                    }
                    // Mark selected fairways as checked and render.
                    for (const fairway of results.fairways) {
                        if (obstacle.fairway.includes(fairway._id)) {
                            fairway.checked = "true";
                        }
                    }
                    // Mark selected targets as checked and render.
                    for (const target of results.targets) {
                        if (obstacle.target.includes(target._id)) {
                            target.checked = "true";
                        }
                    }
                    // Mark selected rRs as checked and render.
                    for (const rR of results.rRs) {
                        if (obstacle.rR.includes(rR._id)) {
                            rR.checked = "true";
                        }
                    }
                    // Mark selected bunkers as checked and render.
                    for (const bunker of results.bunkers) {
                        if (obstacle.bunker.includes(bunker._id)) {
                            bunker.checked = "true";
                        }
                    }
                    // Mark selected laterals as checked and render.
                    for (const lateral of results.laterals) {
                        if (obstacle.lateral.includes(lateral._id)) {
                            lateral.checked = "true";
                        }
                    }
                    // Mark selected crossings as checked and render.
                    for (const crossing of results.crossings) {
                        if (obstacle.crossing.includes(crossing._id)) {
                            crossing.checked = "true";
                        }
                    }
                    // Mark selected trees as checked and render.
                    for (const tree of results.trees) {
                        if (obstacle.tree.includes(tree._id)) {
                            tree.checked = "true";
                        }
                    }
                    // Mark selected surfaces as checked and render.
                    for (const surface of results.surfaces) {
                        if (obstacle.surface.includes(surface._id)) {
                            surface.checked = "true";
                        }
                    }
                    res.render("obstacle_form", {
                        title: "Create Obstacle",
                        layups: results.layups,
                        doglegs: results.doglegs,
                        rolls: results.rolls,
                        topos: results.topos,
                        fairways: results.fairways,
                        targets: results.targets,
                        rRs: results.rRs,
                        bunkers: results.bunkers,
                        laterals: results.laterals,
                        crossings: results.crossings,
                        trees: results.trees,
                        surfaces: results.surfaces,
                        obstacle,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        // Data from form is valid. Save Obstacle.
        obstacle.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new course record.
            res.redirect(obstacle.url);
        });
    },
];

// Display obstacle delete form on GET.
exports.obstacle_delete_get = (req, res, next) => {
    async.parallel(
        {
            obstacle: function (callback) {
                Obstacle.findById(req.params.id)
                    .populate("layup")
                    .populate("dogleg")
                    .populate("roll")
                    .populate("topo")
                    .populate("fairway")
                    .populate("target")
                    .populate("rR")
                    .populate("bunker")
                    .populate("lateral")
                    .populate("crossing")
                    .populate("tree")
                    .populate("surface")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.obstacle == null) {
                // No results
                res.redirect("/catalog/obstacles");
            }
            // Sucessful, so render
            res.render("obstacle_delete", {
                title: "Delete Obstacle",
                obstacle: results.obstacle,
            });
        }
    );
};

// Handle obstacle delete on POST.
exports.obstacle_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    
    async.parallel(
        {
            obstacle: function (callback) {
                Obstacle.findById(req.params.id)
                    .populate("layup")
                    .populate("dogleg")
                    .populate("roll")
                    .populate("topo")
                    .populate("fairway")
                    .populate("target")
                    .populate("rR")
                    .populate("bunker")
                    .populate("lateral")
                    .populate("crossing")
                    .populate("tree")
                    .populate("surface")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            // Success
            if (results.obstacle.layup != null || results.obstacle.dogleg.length != null || 
                results.obstacle.roll.length != null || results.obstacle.topo.length != null ||
                results.obstacle.fairway.length != null || results.obstacle.target.length != null ||
                results.obstacle.rR.length != null || results.obstacle.bunker.length != null ||
                results.obstacle.lateral.length != null || results.obstacle.crossing.length != null ||
                results.tree.layup.length != null || results.obstacle.surface.length != null) {
                res.render("obstacle_delete", {
                    title: "Delete Obstacle",
                    obstacle: results.obstacle,
                });
                return;
            } else {
                // Obstacle has no obstacle objects. Delete object and redirect to the list of obstacles.
                Obstacle.findByIdAndRemove(req.body.obstacleid, function deleteObstacle(err) {
                    if (err) {
                        return next(err);
                    }
                    // Success - go to obstacles list.
                    res.redirect("/catalog/obstacles");
                });
            }
        }
    );
};

// Display obstacle update form on GET.
exports.obstacle_update_get = (req, res, next) => {
    // get the obstacle and obstacles for the form.
    async.parallel(
        {
            obstacle(callback) {
                Obstacle.findById(req.params.id)
                    .populate("layup")
                    .populate("dogleg")
                    .populate("roll")
                    .populate("topo")
                    .populate("fairway")
                    .populate("target")
                    .populate("rR")
                    .populate("bunker")
                    .populate("lateral")
                    .populate("crossing")
                    .populate("tree")
                    .populate("surface")
                    .exec(callback);
            },
            layups(callback) {
                Layup.find(callback);
            },
            doglegs(callback) {
                Dogleg.find(callback);
            },
            rolls(callback) {
                Roll.find(callback);
            },
            topos(callback) {
                Topo.find(callback);
            },
            fairways(callback) {
                Fairway.find(callback);
            },
            targets(callback) {
                Target.find(callback);
            },
            rRs(callback) {
                RR.find(callback);
            },
            bunkers(callback) {
                Bunker.find(callback);
            },
            laterals(callback) {
                Lateral.find(callback);
            },
            crossings(callback) {
                Crossing.find(callback);
            },
            trees(callback) {
                Tree.find(callback);
            },
            surfaces(callback) {
                Surface.find(callback);
            },
        },
        
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.obstacle == null) {
                // No, results
                const err = new Error("Obstacle not found");
                err.status = 404;
                return next(err);
            }
            // Mark selected layups as checked and render.
            for (const layup of results.layups) {
                const aLayup = results.obstacle.layup 
                if (layup._id.toString() === aLayup._id.toString()) {
                    layup.checked = "true";
                }
            }
            // Mark selected doglegs as checked and render.
            for (const dogleg of results.doglegs) {
                const aDogleg = results.obstacle.dogleg
                if (dogleg._id.toString() === aDogleg._id.toString()) {
                    dogleg.checked = "true";
                }
            }
            // Mark selected rolls as checked and render.
            for (const roll of results.rolls) {
                const aRoll = results.obstacle.roll
                if (roll._id.toString() === aRoll._id.toString()) {
                    roll.checked = "true";
                }
            }
            // Mark selected topos as checked and render.
            for (const topo of results.topos) {
                const aTopo = results.obstacle.topo
                if (topo._id.toString() === aTopo._id.toString()) {
                    topo.checked = "true";
                }
            }
            // Mark selected fairways as checked and render.
            for (const fairway of results.fairways) {
                const aFairway = results.obstacle.fairway
                if (fairway._id.toString() === aFairway._id.toString()) {
                    fairway.checked = "true";
                }
            }
            // Mark selected targets as checked and render.
            for (const target of results.targets) {
                const aTarget = results.obstacle.target
                if (target._id.toString() === aTarget._id.toString()) {
                    target.checked = "true";
                }
            }
            // Mark selected rRs as checked and render.
            for (const rR of results.rRs) {
                const aRR = results.obstacle.rR
                if (rR._id.toString() === aRR._id.toString()) {
                    rR.checked = "true";
                }
            }
            // Mark selected bunkers as checked and render.
            for (const bunker of results.bunkers) {
                const aBunker = results.obstacle.bunker
                if (bunker._id.toString() === aBunker._id.toString()) {
                    bunker.checked = "true";
                }    
            }
            // Mark selected laterals as checked and render.
            for (const lateral of results.laterals) {
                const aLateral = results.obstacle.lateral
                if (lateral._id.toString() === aLateral._id.toString()) {
                    lateral.checked = "true";
                }
            }
            // Mark selected crossings as checked and render.
            for (const crossing of results.crossings) {
                const aCrossing = results.obstacle.crossing
                if (crossing._id.toString() === aCrossing._id.toString()) {
                    crossing.checked = "true";
                }
            }
            // Mark selected trees as checked and render.
            for (const tree of results.trees) {
                const aTree = results.obstacle.tree
                if (tree._id.toString() === aTree._id.toString()) {
                    tree.checked = "true";
                }
            }
            // Mark selected surfaces as checked and render.
            for (const surface of results.surfaces) {
                const aSurface = results.obstacle.surface
                if (surface._id.toString() === aSurface._id.toString()) {
                    surface.checked = "true";
                }
            }
            res.render("obstacle_form", {
                title: "Update Obstacle",
                layups: results.layups,
                doglegs: results.doglegs,
                rolls: results.rolls,
                topos: results.topos,
                fairways: results.fairways,
                targets: results.targets,
                rRs: results.rRs,
                bunkers: results.bunkers,
                laterals: results.laterals,
                crossings: results.crossings,
                trees: results.trees,
                surfaces: results.surfaces,
                obstacle: results.obstacle,
            });
        }
    );
};

// Handle obstacle update on POST.
exports.obstacle_update_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({min: 1 }).escape(),
    body("layup", "Layup must not be empty.").trim().isLength({min: 1 }).escape(),
    body("dogleg", "Dogleg must not be empty.").trim().isLength({min: 1 }).escape(),
    body("roll", "Roll must not be empty.").trim().isLength({min: 1 }).escape(),
    body("topo", "Topo must not be empty.").trim().isLength({min: 1 }).escape(),
    body("fairway", "Fairway must not be empty.").trim().isLength({min: 1 }).escape(),
    body("target", "Target must not be empty.").trim().isLength({min: 1 }).escape(),
    body("rR", "RR must not be empty.").trim().isLength({min: 1 }).escape(),
    body("bunker", "Bunker must not be empty.").trim().isLength({min: 1 }).escape(),
    body("lateral", "Lateral must not be empty.").trim().isLength({min: 1 }).escape(),
    body("crossing", "Crossing must not be empty.").trim().isLength({min: 1 }).escape(),
    body("tree", "Tree must not be empty.").trim().isLength({min: 1 }).escape(),
    body("surface", "Surface must not be empty.").trim().isLength({min: 1 }).escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Obstacle object with escaped and trimmed data.
        const obstacle = new Obstacle({
            name: req.body.name,
            layup: req.body.layup,
            dogleg: req.body.dogleg,
            roll: req.body.roll,
            topo: req.body.topo,
            fairway: req.body.fairway,
            target: req.body.target,
            rR: req.body.rR,
            bunker: req.body.bunker,
            lateral: req.body.lateral,
            crossing: req.body.crossing,
            tree: req.body.tree,
            surface: req.body.surface,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all obstacles for form.
            
            // Get all obstacles for the form
            async.parallel(
                {
                    layups(callback) {
                        Layup.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    doglegs(callback) {
                        Dogleg.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    rolls(callback) {
                        Roll.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    topos(callback) {
                        Topo.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    fairways(callback) {
                        Fairway.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    targets(callback) {
                        Target.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    rRs(callback) {
                        RR.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    bunkers(callback) {
                        Bunker.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    laterals(callback) {
                        Lateral.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    crossings(callback) {
                        Crossing.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    trees(callback) {
                        Tree.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                {
                    surfaces(callback) {
                        Surface.find({})
                            .sort({ name: 1 })
                            .exec(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    res.render("obstacle_form", {
                        title: "Update Obstacle",
                        layups: results.layups,
                        doglegs: results.doglegs,
                        rolls: results.rolls,
                        topos: results.topos,
                        fairways: results.fairways,
                        targets: results.targets,
                        rRs: results.rRs,
                        bunkers: results.bunkers,
                        laterals: results.laterals,
                        crossings: results.crossings,
                        trees: results.trees,
                        surfaces: results.surfaces,
                        obstacle,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        
        // Data from form is valid. Update the record.
        Obstacle.findByIdAndUpdate(req.params.id, obstacle, {runValidators: true}, (err, theobstacle) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to book detail page.
            res.redirect(theobstacle.url);
        });
    },
]
