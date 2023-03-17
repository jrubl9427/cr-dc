// greenObstacleController.js

const GreenObstacle = require("../models/greenObstacle");
const RR = require("../models/rR");
const Bunker = require("../models/bunker");
const Lateral = require("../models/lateral");
const Tree = require("../models/tree");
const Surface = require("../models/surface");
const async = require("async");
const { body, validationResult } = require("express-validator");
const { ObjectID, ObjectId } = require("bson");

// Display a list of all greenObstacles.
exports.greenObstacle_list = (req, res, next) => {
    GreenObstacle.find({})
        .sort({ name: 1 })
        .exec(function (err, list_greenObstacles) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("greenObstacle_list", {
                    title: "GreenObstacle List",
                    greenObstacle_list: list_greenObstacles
                });
            }
        });
};

// Display detail page for a specific greenObstacle.
exports.greenObstacle_detail = (req, res, next) => {
    async.parallel(
        {
            greenObstacle(callback) {
                GreenObstacle.findById(req.params.id)
                    .populate("rR")
                    .populate("bunker")
                    .populate("lateral")
                    .populate("tree")
                    .populate("surface")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.greenObstacle == null) {
                // No, results
                const err = new Error("GreenObstacle not found");
                err.status = 404;
                return next(err);
            }
            res.render("greenObstacle_detail", {
                title: results.greenObstacle.name,
                greenObstacle: results.greenObstacle
            });
        }
    );
};

// Display greenObstacle create form on GET.
exports.greenObstacle_create_get = (req, res, next) => {
    // Get all tees, lzs and greens .
    async.parallel(
        {
            rRs(callback) {
                RR.find(callback);
            },
            bunkers(callback) {
                Bunker.find(callback);
            },
            laterals(callback) {
                Lateral.find(callback);
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
            res.render("greenObstacle_form", {
                title: "Create GreenObstacle",
                rRs: results.rRs,
                bunkers: results.bunkers,
                laterals: results.laterals,
                trees: results.trees,
                surfaces: results.surfaces,
            });
        }
    );
};

// Handle greenObstacle create on POST.
exports.greenObstacle_create_post = [
    // Convert greenObstacles to arrays.
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
    body("rR.*").escape(),
    body("bunker.*").escape(),
    body("lateral.*").escape(),
    body("tree.*").escape(),
    body("surface.*").escape(),

    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a greenObstacle object with escaped and trimmed data.
        const greenObstacle = new GreenObstacle({
            name: req.body.name + " greenObstacle",
            rR: req.body.rR,
            bunker: req.body.bunker,
            lateral: req.body.lateral,
            tree: req.body.tree,
            surface: req.body.surface,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all greenObstacles for form.
            
            // Get all greenObstacles for the form
            async.parallel(
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
                    
                    // Mark selected rRs as checked and render.
                    for (const rR of results.rRs) {
                        if (greenObstacle.rR.includes(rR._id)) {
                            rR.checked = "true";
                        }
                    }
                    // Mark selected bunkers as checked and render.
                    for (const bunker of results.bunkers) {
                        if (greenObstacle.bunker.includes(bunker._id)) {
                            bunker.checked = "true";
                        }
                    }
                    // Mark selected laterals as checked and render.
                    for (const lateral of results.laterals) {
                        if (greenObstacle.lateral.includes(lateral._id)) {
                            lateral.checked = "true";
                        }
                    }
                    // Mark selected trees as checked and render.
                    for (const tree of results.trees) {
                        if (greenObstacle.tree.includes(tree._id)) {
                            tree.checked = "true";
                        }
                    }
                    // Mark selected surfaces as checked and render.
                    for (const surface of results.surfaces) {
                        if (greenObstacle.surface.includes(surface._id)) {
                            surface.checked = "true";
                        }
                    }
                    res.render("greenObstacle_form", {
                        title: "Create GreenObstacle",
                        rRs: results.rRs,
                        bunkers: results.bunkers,
                        laterals: results.laterals,
                        trees: results.trees,
                        surfaces: results.surfaces,
                        greenObstacle,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        // Data from form is valid. Save greenObstacle.
        greenObstacle.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new course record.
            res.redirect(greenObstacle.url);
        });
    },
];

// Display greenObstacle delete form on GET.
exports.greenObstacle_delete_get = (req, res, next) => {
    async.parallel(
        {
            greenObstacle: function (callback) {
                GreenObstacle.findById(req.params.id)
                    .populate("rR")
                    .populate("bunker")
                    .populate("lateral")
                    .populate("tree")
                    .populate("surface")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.greenObstacle == null) {
                // No results
                res.redirect("/catalog/greenObstacles");
            }
            // Sucessful, so render
            res.render("greenObstacle_delete", {
                title: "Delete GreenObstacle",
                greenObstacle: results.greenObstacle,
            });
        }
    );
};

// Handle greenObstacle delete on POST.
exports.greenObstacle_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    
    async.parallel(
        {
            greenObstacle: function (callback) {
                GreenObstacle.findById(req.params.id)
                    .populate("rR")
                    .populate("bunker")
                    .populate("lateral")
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
            if (results.greenObstacle.rR.length != null || 
                results.greenObstacle.bunker.length != null ||
                results.greenObstacle.lateral.length != null || 
                results.greenObstacle.tree.layup.length != null || 
                results.greenObstacle.surface.length != null) {
                res.render("greenObstacle_delete", {
                    title: "Delete GreenObstacle",
                    greenObstacle: results.greenObstacle,
                });
                return;
            } else {
                // greenObstacle has no greenObstacle objects. Delete object and redirect to the list of greenObstacles.
                GreenObstacle.findByIdAndRemove(req.body.greenObstacleid, function deletegreenObstacle(err) {
                    if (err) {
                        return next(err);
                    }
                    // Success - go to greenObstacles list.
                    res.redirect("/catalog/greenObstacles");
                });
            }
        }
    );
};

// Display greenObstacle update form on GET.
exports.greenObstacle_update_get = (req, res, next) => {
    // get the greenObstacle and greenObstacles for the form.
    async.parallel(
        {
            greenObstacle(callback) {
                GreenObstacle.findById(req.params.id)
                    .populate("rR")
                    .populate("bunker")
                    .populate("lateral")
                    .populate("tree")
                    .populate("surface")
                    .exec(callback);
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
                        
            if (results.greenObstacle == null) {
                // No, results
                const err = new Error("GreenObstacle not found");
                err.status = 404;
                return next(err);
            }
            
            // Mark selected rRs as checked and render.
            for (const rR of results.rRs) {
                const aRR = results.greenObstacle.rR
                if (rR._id.toString() === aRR._id.toString()) {
                    rR.checked = "true";
                }
            }
            // Mark selected bunkers as checked and render.
            for (const bunker of results.bunkers) {
                const aBunker = results.greenObstacle.bunker
                if (bunker._id.toString() === aBunker._id.toString()) {
                    bunker.checked = "true";
                }    
            }
            // Mark selected laterals as checked and render.
            for (const lateral of results.laterals) {
                const aLateral = results.greenObstacle.lateral
                if (lateral._id.toString() === aLateral._id.toString()) {
                    lateral.checked = "true";
                }
            }
            // Mark selected trees as checked and render.
            for (const tree of results.trees) {
                const aTree = results.greenObstacle.tree
                if (tree._id.toString() === aTree._id.toString()) {
                    tree.checked = "true";
                }
            }
            // Mark selected surfaces as checked and render.
            for (const surface of results.surfaces) {
                const aSurface = results.greenObstacle.surface
                if (surface._id.toString() === aSurface._id.toString()) {
                    surface.checked = "true";
                }
            }
            res.render("greenObstacle_form", {
                title: "Update GreenObstacle",
                rRs: results.rRs,
                bunkers: results.bunkers,
                laterals: results.laterals,
                trees: results.trees,
                surfaces: results.surfaces,
                greenObstacle: results.greenObstacle,
            });
        }
    );
};

// Handle greenObstacle update on POST.
exports.greenObstacle_update_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({min: 1 }).escape(),
    body("rR", "RR must not be empty.").trim().isLength({min: 1 }).escape(),
    body("bunker", "Bunker must not be empty.").trim().isLength({min: 1 }).escape(),
    body("lateral", "Lateral must not be empty.").trim().isLength({min: 1 }).escape(),
    body("tree", "Tree must not be empty.").trim().isLength({min: 1 }).escape(),
    body("surface", "Surface must not be empty.").trim().isLength({min: 1 }).escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a greenObstacle object with escaped and trimmed data.
        const greenObstacle = new GreenObstacle({
            name: req.body.name,
            rR: req.body.rR,
            bunker: req.body.bunker,
            lateral: req.body.lateral,
            tree: req.body.tree,
            surface: req.body.surface,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all GreenObstacles for form.
            
            // Get all GreenObstacle for the form
            async.parallel(
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
                    res.render("greenObstacle_form", {
                        title: "Update GreenObstacle",
                        rRs: results.rRs,
                        bunkers: results.bunkers,
                        laterals: results.laterals,
                        trees: results.trees,
                        surfaces: results.surfaces,
                        greenObstacle,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        
        // Data from form is valid. Update the record.
        GreenObstacle.findByIdAndUpdate(req.params.id, greenObstacle, {runValidators: true}, (err, thegreenObstacle) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to book detail page.
            res.redirect(thegreenObstacle.url);
        });
    },
]
