// teeObstacleController.js

const TeeObstacle = require("../models/teeObstacle");
const Target = require("../models/target");
const RR = require("../models/rR");
const Crossing = require("../models/crossing");
const Tree = require("../models/tree");
const async = require("async");
const { body, validationResult } = require("express-validator");
const { ObjectID, ObjectId } = require("bson");

// Display a list of all teeObstacles.
exports.teeObstacle_list = (req, res, next) => {
    TeeObstacle.find({})
        .sort({ name: 1 })
        .exec(function (err, list_teeObstacles) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("teeObstacle_list", {
                    title: "TeeObstacle List",
                    teeObstacle_list: list_teeObstacles
                });
            }
        });
};

// Display detail page for a specific teeObstacle.
exports.teeObstacle_detail = (req, res, next) => {
    async.parallel(
        {
            teeObstacle(callback) {
                TeeObstacle.findById(req.params.id)
                    .populate("target")
                    .populate("rR")
                    .populate("crossing")
                    .populate("tree")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.teeObstacle == null) {
                // No, results
                const err = new Error("TeeObstacle not found");
                err.status = 404;
                return next(err);
            }
            res.render("teeObstacle_detail", {
                title: results.teeObstacle.name,
                teeObstacle: results.teeObstacle
            });
        }
    );
};

// Display teeObstacle create form on GET.
exports.teeObstacle_create_get = (req, res, next) => {
    // Get all tees, lzs and greens .
    async.parallel(
        {
            targets(callback) {
                Target.find(callback)
                    .sort({ name: 1 });
            },
            rRs(callback) {
                RR.find(callback)
                    .sort({ name: 1 });
            },
            crossings(callback) {
                Crossing.find(callback)
                    .sort({ name: 1 });
            },
            trees(callback) {
                Tree.find(callback)
                    .sort({ name: 1 });
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render("teeObstacle_form", {
                title: "Create TeeObstacle",
                targets: results.targets,
                rRs: results.rRs,
                crossings: results.crossings,
                trees: results.trees
            });
        }
    );
};

// Handle teeObstacle create on POST.
exports.teeObstacle_create_post = [
    // Convert teeObstacles to arrays.
    
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
    body("target.*").escape(),
    body("rR.*").escape(),
    body("crossing.*").escape(),
    body("tree.*").escape(),

    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a teeObstacle object with escaped and trimmed data.
        const teeObstacle = new TeeObstacle({
            name: req.body.name + " teeObstacle",
            target: req.body.target,
            rR: req.body.rR,
            crossing: req.body.crossing,
            tree: req.body.tree
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all teeObstacles for form.
            
            // Get all teeObstacles for the form
            async.parallel(
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

                    // Mark selected targets as checked and render.
                    for (const target of results.targets) {
                        if (teeObstacle.target.includes(target._id)) {
                            target.checked = "true";
                        }
                    }
                    // Mark selected rRs as checked and render.
                    for (const rR of results.rRs) {
                        if (teeObstacle.rR.includes(rR._id)) {
                            rR.checked = "true";
                        }
                    }
                    // Mark selected crossings as checked and render.
                    for (const crossing of results.crossings) {
                        if (teeObstacle.crossing.includes(crossing._id)) {
                            crossing.checked = "true";
                        }
                    }
                    // Mark selected trees as checked and render.
                    for (const tree of results.trees) {
                        if (teeObstacle.tree.includes(tree._id)) {
                            tree.checked = "true";
                        }
                    }
                    res.render("teeObstacle_form", {
                        title: "Create TeeObstacle",
                        targets: results.targets,
                        rRs: results.rRs,
                        crossings: results.crossings,
                        trees: results.trees,
                        teeObstacle,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        // Data from form is valid. Save teeObstacle.
        teeObstacle.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new course record.
            res.redirect(teeObstacle.url);
        });
    },
];

// Display teeObstacle delete form on GET.
exports.teeObstacle_delete_get = (req, res, next) => {
    async.parallel(
        {
            teeObstacle: function (callback) {
                TeeObstacle.findById(req.params.id)
                    .populate("target")
                    .populate("rR")
                    .populate("crossing")
                    .populate("tree")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.teeObstacle == null) {
                // No results
                res.redirect("/catalog/teeObstacles");
            }
            // Sucessful, so render
            res.render("teeObstacle_delete", {
                title: "Delete TeeObstacle",
                teeObstacle: results.teeObstacle,
            });
        }
    );
};

// Handle teeObstacle delete on POST.
exports.teeObstacle_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    
    async.parallel(
        {
            teeObstacle: function (callback) {
                TeeObstacle.findById(req.params.id)
                    .populate("target")
                    .populate("rR")
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
            if (results.teeObstacle.target.length != null ||
                results.teeObstacle.rR.length != null || 
                results.teeObstacle.crossing.length != null ||
                results.tree.layup.length != null) {
                res.render("teeObstacle_delete", {
                    title: "Delete TeeObstacle",
                    teeObstacle: results.teeObstacle,
                });
                return;
            } else {
                // teeObstacle has no teeObstacle objects. Delete object and redirect to the list of teeObstacles.
                TeeObstacle.findByIdAndRemove(req.body.teeObstacleid, function deleteteeObstacle(err) {
                    if (err) {
                        return next(err);
                    }
                    // Success - go to teeObstacles list.
                    res.redirect("/catalog/teeObstacles");
                });
            }
        }
    );
};

// Display teeObstacle update form on GET.
exports.teeObstacle_update_get = (req, res, next) => {
    // get the teeObstacle and teeObstacles for the form.
    async.parallel(
        {
            teeObstacle(callback) {
                TeeObstacle.findById(req.params.id)
                    .populate("target")
                    .populate("rR")
                    .populate("crossing")
                    .populate("tree")
                    .exec(callback);
            },
            targets(callback) {
                Target.find(callback);
            },
            rRs(callback) {
                RR.find(callback);
            },
            crossings(callback) {
                Crossing.find(callback);
            },
            trees(callback) {
                Tree.find(callback);
            },
        },
        
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.teeObstacle == null) {
                // No, results
                const err = new Error("teeObstacle not found");
                err.status = 404;
                return next(err);
            }
            // Mark selected targets as checked and render.
            for (const target of results.targets) {
                const aTarget = results.teeObstacle.target
                if (target._id.toString() === aTarget._id.toString()) {
                    target.checked = "true";
                }
            }
            // Mark selected rRs as checked and render.
            for (const rR of results.rRs) {
                const aRR = results.teeObstacle.rR
                if (rR._id.toString() === aRR._id.toString()) {
                    rR.checked = "true";
                }
            }
            // Mark selected crossings as checked and render.
            for (const crossing of results.crossings) {
                const aCrossing = results.teeObstacle.crossing
                if (crossing._id.toString() === aCrossing._id.toString()) {
                    crossing.checked = "true";
                }
            }
            // Mark selected trees as checked and render.
            for (const tree of results.trees) {
                const aTree = results.teeObstacle.tree
                if (tree._id.toString() === aTree._id.toString()) {
                    tree.checked = "true";
                }
            }
            res.render("teeObstacle_form", {
                title: "Update TeeObstacle",
                targets: results.targets,
                rRs: results.rRs,
                crossings: results.crossings,
                trees: results.trees,
                teeObstacle: results.teeObstacle,
            });
        }
    );
};

// Handle teeObstacle update on POST.
exports.teeObstacle_update_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({min: 1 }).escape(),
    body("target", "Target must not be empty.").trim().isLength({min: 1 }).escape(),
    body("rR", "RR must not be empty.").trim().isLength({min: 1 }).escape(),
    body("crossing", "Crossing must not be empty.").trim().isLength({min: 1 }).escape(),
    body("tree", "Tree must not be empty.").trim().isLength({min: 1 }).escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a teeObstacle object with escaped and trimmed data.
        const teeObstacle = new TeeObstacle({
            name: req.body.name,
            target: req.body.target,
            rR: req.body.rR,
            crossing: req.body.crossing,
            tree: req.body.tree,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all teeObstacles for form.
            
            // Get all teeObstacles for the form
            async.parallel(
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
                    res.render("teeObstacle_form", {
                        title: "Update TeeObstacle",
                        targets: results.targets,
                        rRs: results.rRs,
                        crossings: results.crossings,
                        trees: results.trees,
                        teeObstacle,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        
        // Data from form is valid. Update the record.
        TeeObstacle.findByIdAndUpdate(req.params.id, teeObstacle, {runValidators: true}, (err, theteeObstacle) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to book detail page.
            res.redirect(theteeObstacle.url);
        });
    },
]
