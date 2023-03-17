// lzObstacleController.js

const LzObstacle = require("../models/lzObstacle");
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
const async = require("async");
const { body, validationResult } = require("express-validator");
const { ObjectID, ObjectId } = require("bson");

// Display a list of all lzObstacles.
exports.lzObstacle_list = (req, res, next) => {
    LzObstacle.find({})
        .sort({ name: 1 })
        .exec(function (err, list_lzObstacles) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("lzObstacle_list", {
                    title: "LzObstacle List",
                    lzObstacle_list: list_lzObstacles
                });
            }
        });
};

// Display detail page for a specific lzObstacle.
exports.lzObstacle_detail = (req, res, next) => {
    async.parallel(
        {
            lzObstacle(callback) {
                LzObstacle.findById(req.params.id)
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
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.lzObstacle == null) {
                // No, results
                const err = new Error("LzObstacle not found");
                err.status = 404;
                return next(err);
            }
            res.render("lzObstacle_detail", {
                title: results.lzObstacle.name,
                lzObstacle: results.lzObstacle
            });
        }
    );
};

// Display lzObstacle create form on GET.
exports.lzObstacle_create_get = (req, res, next) => {
    // Get all tees, lzs and greens .
    async.parallel(
        {
            layups(callback) {
                Layup.find(callback)
                    .sort({ name: 1 });
            },
            doglegs(callback) {
                Dogleg.find(callback)
                    .sort({ name: 1 });
            },
            rolls(callback) {
                Roll.find(callback)
                    .sort({ name: 1 });
            },
            topos(callback) {
                Topo.find(callback)
                    .sort({ name: 1 });
            },
            fairways(callback) {
                Fairway.find(callback)
                    .sort({ name: 1 });
            },
            targets(callback) {
                Target.find(callback)
                    .sort({ name: 1 });
            },
            rRs(callback) {
                RR.find(callback)
                    .sort({ name: 1 });
            },
            bunkers(callback) {
                Bunker.find(callback)
                    .sort({ name: 1 });
            },
            laterals(callback) {
                Lateral.find(callback)
                    .sort({ name: 1 });
            },
            crossings(callback) {
                Crossing.find(callback)
                    .sort({ name: 1 });
            },
            trees(callback) {
                Tree.find(callback)
                    .sort({ name: 1 });
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render("lzObstacle_form", {
                title: "Create LzObstacle",
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
            });
        }
    );
};

// Handle lzObstacle create on POST.
exports.lzObstacle_create_post = [
    // Convert lzObstacles to arrays.
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

    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a LzObstacle object with escaped and trimmed data.
        const lzObstacle = new LzObstacle({
            name: req.body.name + " lzObstacle",
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
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all lzObstacles for form.
            
            // Get all lzObstacles for the form
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
                (err, results) => {
                    if (err) {
                        return next(err);
                    }

                    // Mark selected layups as checked and render.
                    for (const layup of results.layups) {
                        if (lzObstacle.layup.includes(layup._id)) {
                            layup.checked = "true";
                        }
                    }
                    // Mark selected doglegs as checked and render.
                    for (const dogleg of results.doglegs) {
                        if (lzObstacle.dogleg.includes(dogleg._id)) {
                            dogleg.checked = "true";
                        }
                    }
                    // Mark selected rolls as checked and render.
                    for (const roll of results.rolls) {
                        if (lzObstacle.roll.includes(roll._id)) {
                            roll.checked = "true";
                        }
                    }
                    // Mark selected topos as checked and render.
                    for (const topo of results.topos) {
                        if (lzObstacle.topo.includes(topo._id)) {
                            topo.checked = "true";
                        }
                    }
                    // Mark selected fairways as checked and render.
                    for (const fairway of results.fairways) {
                        if (lzObstacle.fairway.includes(fairway._id)) {
                            fairway.checked = "true";
                        }
                    }
                    // Mark selected targets as checked and render.
                    for (const target of results.targets) {
                        if (lzObstacle.target.includes(target._id)) {
                            target.checked = "true";
                        }
                    }
                    // Mark selected rRs as checked and render.
                    for (const rR of results.rRs) {
                        if (lzObstacle.rR.includes(rR._id)) {
                            rR.checked = "true";
                        }
                    }
                    // Mark selected bunkers as checked and render.
                    for (const bunker of results.bunkers) {
                        if (lzObstacle.bunker.includes(bunker._id)) {
                            bunker.checked = "true";
                        }
                    }
                    // Mark selected laterals as checked and render.
                    for (const lateral of results.laterals) {
                        if (lzObstacle.lateral.includes(lateral._id)) {
                            lateral.checked = "true";
                        }
                    }
                    // Mark selected crossings as checked and render.
                    for (const crossing of results.crossings) {
                        if (lzObstacle.crossing.includes(crossing._id)) {
                            crossing.checked = "true";
                        }
                    }
                    // Mark selected trees as checked and render.
                    for (const tree of results.trees) {
                        if (lzObstacle.tree.includes(tree._id)) {
                            tree.checked = "true";
                        }
                    }
                    res.render("lzObstacle_form", {
                        title: "Create LzObstacle",
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
                        lzObstacle,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        // Data from form is valid. Save LzObstacle.
        lzObstacle.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new course record.
            res.redirect(lzObstacle.url);
        });
    },
];

// Display lzObstacle delete form on GET.
exports.lzObstacle_delete_get = (req, res, next) => {
    async.parallel(
        {
            lzObstacle: function (callback) {
                LzObstacle.findById(req.params.id)
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
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.lzObstacle == null) {
                // No results
                res.redirect("/catalog/lzObstacles");
            }
            // Sucessful, so render
            res.render("lzObstacle_delete", {
                title: "Delete LzObstacle",
                lzObstacle: results.lzObstacle,
            });
        }
    );
};

// Handle lzObstacle delete on POST.
exports.lzObstacle_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    
    async.parallel(
        {
            lzObstacle: function (callback) {
                LzObstacle.findById(req.params.id)
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
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            // Success
            if (results.lzObstacle.layup != null || results.lzObstacle.dogleg.length != null || 
                results.lzObstacle.roll.length != null || results.lzObstacle.topo.length != null ||
                results.lzObstacle.fairway.length != null || results.lzObstacle.target.length != null ||
                results.lzObstacle.rR.length != null || results.lzObstacle.bunker.length != null ||
                results.lzObstacle.lateral.length != null || results.lzObstacle.crossing.length != null ||
                results.tree.layup.length != null) {
                res.render("lzObstacle_delete", {
                    title: "Delete LzObstacle",
                    lzObstacle: results.lzObstacle,
                });
                return;
            } else {
                // LzObstacle has no lzObstacle objects. Delete object and redirect to the list of lzObstacles.
                LzObstacle.findByIdAndRemove(req.body.lzObstacleid, function deleteLzObstacle(err) {
                    if (err) {
                        return next(err);
                    }
                    // Success - go to lzObstacles list.
                    res.redirect("/catalog/lzObstacles");
                });
            }
        }
    );
};

// Display lzObstacle update form on GET.
exports.lzObstacle_update_get = (req, res, next) => {
    // get the lzObstacle and lzObstacles for the form.
    async.parallel(
        {
            lzObstacle(callback) {
                LzObstacle.findById(req.params.id)
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
                    .exec(callback);
            },
            layups(callback) {
                Layup.find(callback)
                    .sort({ name: 1 });
            },
            doglegs(callback) {
                Dogleg.find(callback)
                    .sort({ name: 1 });
            },
            rolls(callback) {
                Roll.find(callback)
                    .sort({ name: 1 });
            },
            topos(callback) {
                Topo.find(callback)
                    .sort({ name: 1 });
            },
            fairways(callback) {
                Fairway.find(callback)
                    .sort({ name: 1 });
            },
            targets(callback) {
                Target.find(callback)
                    .sort({ name: 1 });
            },
            rRs(callback) {
                RR.find(callback)
                    .sort({ name: 1 });
            },
            bunkers(callback) {
                Bunker.find(callback)
                    .sort({ name: 1 });
            },
            laterals(callback) {
                Lateral.find(callback)
                    .sort({ name: 1 });
            },
            crossings(callback) {
                Crossing.find(callback)
                    .sort({ name: 1 });
            },
            trees(callback) {
                Tree.find(callback)
                    .sort({ name: 1 });
            },
        },
        
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.lzObstacle == null) {
                // No, results
                const err = new Error("LzObstacle not found");
                err.status = 404;
                return next(err);
            }
            // Mark selected layups as checked and render.
            for (const layup of results.layups) {
                const aLayup = results.lzObstacle.layup 
                if (layup._id.toString() === aLayup._id.toString()) {
                    layup.checked = "true";
                }
            }
            // Mark selected doglegs as checked and render.
            for (const dogleg of results.doglegs) {
                const aDogleg = results.lzObstacle.dogleg
                if (dogleg._id.toString() === aDogleg._id.toString()) {
                    dogleg.checked = "true";
                }
            }
            // Mark selected rolls as checked and render.
            for (const roll of results.rolls) {
                const aRoll = results.lzObstacle.roll
                if (roll._id.toString() === aRoll._id.toString()) {
                    roll.checked = "true";
                }
            }
            // Mark selected topos as checked and render.
            for (const topo of results.topos) {
                const aTopo = results.lzObstacle.topo
                if (topo._id.toString() === aTopo._id.toString()) {
                    topo.checked = "true";
                }
            }
            // Mark selected fairways as checked and render.
            for (const fairway of results.fairways) {
                const aFairway = results.lzObstacle.fairway
                if (fairway._id.toString() === aFairway._id.toString()) {
                    fairway.checked = "true";
                }
            }
            // Mark selected targets as checked and render.
            for (const target of results.targets) {
                const aTarget = results.lzObstacle.target
                if (target._id.toString() === aTarget._id.toString()) {
                    target.checked = "true";
                }
            }
            // Mark selected rRs as checked and render.
            for (const rR of results.rRs) {
                const aRR = results.lzObstacle.rR
                if (rR._id.toString() === aRR._id.toString()) {
                    rR.checked = "true";
                }
            }
            // Mark selected bunkers as checked and render.
            for (const bunker of results.bunkers) {
                const aBunker = results.lzObstacle.bunker
                if (bunker._id.toString() === aBunker._id.toString()) {
                    bunker.checked = "true";
                }    
            }
            // Mark selected laterals as checked and render.
            for (const lateral of results.laterals) {
                const aLateral = results.lzObstacle.lateral
                if (lateral._id.toString() === aLateral._id.toString()) {
                    lateral.checked = "true";
                }
            }
            // Mark selected crossings as checked and render.
            for (const crossing of results.crossings) {
                const aCrossing = results.lzObstacle.crossing
                if (crossing._id.toString() === aCrossing._id.toString()) {
                    crossing.checked = "true";
                }
            }
            // Mark selected trees as checked and render.
            for (const tree of results.trees) {
                const aTree = results.lzObstacle.tree
                if (tree._id.toString() === aTree._id.toString()) {
                    tree.checked = "true";
                }
            }
            res.render("lzObstacle_form", {
                title: "Update LzObstacle",
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
                lzObstacle: results.lzObstacle,
            });
        }
    );
};

// Handle lzObstacle update on POST.
exports.lzObstacle_update_post = [
    
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
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a LzObstacle object with escaped and trimmed data.
        const lzObstacle = new LzObstacle({
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
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all lzObstacles for form.
            
            // Get all lzObstacles for the form
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
                (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    res.render("lzObstacle_form", {
                        title: "Update LzObstacle",
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
                        lzObstacle,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        
        // Data from form is valid. Update the record.
        LzObstacle.findByIdAndUpdate(req.params.id, lzObstacle, {runValidators: true}, (err, thelzObstacle) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to book detail page.
            res.redirect(thelzObstacle.url);
        });
    },
]
