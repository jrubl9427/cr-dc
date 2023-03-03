// lzController.js

const Lz = require("../models/lz");
const Obstacle = require("../models/obstacle");
const async = require("async");
const { body, validationResult } = require("express-validator");
const { ObjectID, ObjectId } = require("bson");

// Display a list of all lzs.
exports.lz_list = (req, res, next) => {
    Lz.find({})
        .sort({ name: 1 })
        .exec(function (err, list_lzs) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("lz_list", {
                    title: "Lz List",
                    lz_list: list_lzs
                });
            }
        });
};

// Display detail page for a specific lz.
exports.lz_detail = (req, res, next) => {
    async.parallel(
        {
            lz(callback) {
                Lz.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.lz == null) {
                // No, results
                const err = new Error("Lz not found");
                err.status = 404;
                return next(err);
            }
            res.render("lz_detail", {
                title: results.lz.name,
                lz: results.lz
            });
        }
    );
};

// Display lz create form on GET.
exports.lz_create_get = (req, res, next) => {
    // Get all obstacles .
    async.parallel(
        {
            obstacles(callback) {
                Obstacle.find({})
                    .sort({ name: 1 })
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render("lz_form", {
                title: "Create Lz",
                obstacles: results.obstacles
            });
        }
    );
};

// Handle lz create on POST.
exports.lz_create_post = [
    // Convert obstacle to array.
    (req, res, next) => {
        if (!Array.isArray(req.body.obstacle)) {
            req.body.obstacle = typeof req.body.obstacle === "undefined" ? [] : [req.body.obstacle];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("altitude", "Altitude must be integer.").trim().isInt().escape(),
    body("distanceToGreen", "distanceToGreen must be integer.").trim().isInt().escape(),
    body("obstacle.*").escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Lz object with escaped and trimmed data.
        const lz = new Lz({
            name: req.body.name,
            distanceToGreen: req.body.distanceToGreen,
            altitude: req.body.altitude,
            obstacle: req.body.obstacle
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all obstacles for form.
            
            // Get all obstacles for the form
            async.parallel(
                {
                    obstacles(callback) {
                        Obstacle.find(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }

                    // Mark selected obstacles as checked and render.
                    for (const obstacle of results.obstacles) {
                        if (lz.obstacle.includes(obstacle._id)) {
                            obstacle.checked = "true";
                        }
                    }
                    res.render("lz_form", {
                        title: "Create Lz",
                        obstacles: results.obstacles,
                        lz,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        // Data from form is valid. Save Lz.
        lz.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new course record.
            res.redirect(lz.url);
        });
    },
];

// Display lz delete form on GET.
exports.lz_delete_get = (req, res, next) => {
    async.parallel(
        {
            lz: function (callback) {
                Lz.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.lz == null) {
                // No results
                res.redirect("/catalog/lzs");
            }
            // Sucessful, so render
            res.render("lz_delete", {
                title: "Delete Lz",
                lz: results.lz
            });
        }
    );
};

// Handle lz delete on POST.
exports.lz_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    async.parallel(
        {
            lz: function (callback) {
                Lz.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            // Success
            console.log("results", results, results.lz)
            if (results.lz.obstacle.length > 0) {
                res.render("lz_delete", {
                    title: "Delete Lz",
                    lz: results.lz
                });
                return;
            } else {
                // Lz has no lz objects. Delete object and redirect to the list of lzs.
                Lz.findByIdAndRemove(req.body.lzid, function deleteLz(err) {
                    if (err) {
                        return next(err);
                    }
                    // Success - go to lzs list.
                    res.redirect("/catalog/lzs");
                });
            }
        }
    );
};

// Display lz update form on GET.
exports.lz_update_get = (req, res, next) => {
    // get the lz and obstacles for the form.
    async.parallel(
        {
            lz(callback) {
                Lz.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
            obstacles(callback) {
                Obstacle.find(callback)
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.lz == null) {
                // No, results
                const err = new Error("Lz not found");
                err.status = 404;
                return next(err);
            }
            // Successful, mark our selected obstacles as checked
            for (const obstacle of results.obstacles) {
                for (const aObstacle of results.lz.obstacle) {
                    if (obstacle._id.toString() === aObstacle._id.toString()) {
                        obstacle.checked = "true";
                    }
                }
            }
            res.render("lz_form", {
                title: "Update Lz",
                obstacles: results.obstacles,
                lz: results.lz,
            });
        }
    );
};

// Handle lz update on POST.
exports.lz_update_post = [
    // Convert obstacleto array.
    (req, res, next) => {
        if (!Array.isArray(req.body.obstacle)) {
            req.body.obstacle = typeof req.body.obstacle === "undefined" ? [] : [req.body.obstacle];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("altitude", "Altitude must be integer.").trim().isInt().escape(),
    body("distanceToGreen", "distanceToGreen must be integer.").trim().isInt().escape(),
    body("obstacle.*").escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Lz object with escaped and trimmed data.
        const lz = new Lz({
            name: req.body.name,
            distanceToGreen: req.body.distanceToGreen,
            altitude: req.body.altitude,
            obstacle: typeof req.body.obstacle === "undefined" ? [] : req.body.obstacle,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all obstacles for form.
            
            // Get all obstacles for the form
            async.parallel(
                {
                    obstacles(callback) {
                        Obstacle.find(callback);
                    }
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    res.render("lz_form", {
                        title: "Update Lz",
                        obstacles: results.obstacles,
                        lz,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        
        // Data from form is valid. Update the record.
        Lz.findByIdAndUpdate(req.params.id, lz, {}, (err, thelz) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to lz detail page.
            res.redirect(thelz.url);
        });
    },
]
