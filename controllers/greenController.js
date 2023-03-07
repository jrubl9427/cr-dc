// greenController.js

const Green = require("../models/green");
const Obstacle = require("../models/obstacle");
const async = require("async");
const { body, validationResult } = require("express-validator");
const { ObjectID, ObjectId } = require("bson");

// Display a list of all greens.
exports.green_list = (req, res, next) => {
    Green.find({})
        .sort({ name: 1 })
        .exec(function (err, list_greens) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("green_list", {
                    title: "Green List",
                    green_list: list_greens
                });
            }
        });
};

// Display detail page for a specific green.
exports.green_detail = (req, res, next) => {
    async.parallel(
        {
            green(callback) {
                Green.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.green == null) {
                // No, results
                const err = new Error("Green not found");
                err.status = 404;
                return next(err);
            }
            res.render("green_detail", {
                title: results.green.name,
                green: results.green
            });
        }
    );
};

// Display green create form on GET.
exports.green_create_get = (req, res, next) => {
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
            res.render("green_form", {
                title: "Create Green",
                obstacles: results.obstacles
            });
        }
    );
};

// Handle green create on POST.
exports.green_create_post = [
    // Convert obstacle to array.
    (req, res, next) => {
        if (!Array.isArray(req.body.obstacle)) {
            req.body.obstacle = typeof req.body.obstacle === "undefined" ? [] : [req.body.obstacle];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must be an integer.").trim().isInt().escape(),
    body("altitude", "Altitude must be integer.").trim().isInt().escape(),
    body("width", "width must be integer.").trim().isInt().escape(),
    body("depth", "depth must be integer.").trim().isInt().escape(),
    body("obstacle.*").escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a green object with escaped and trimmed data.
        const green = new Green({
            name: req.body.name,
            altitude: req.body.altitude,
            width: req.body.width,
            depth: req.body.depth,
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
                        if (green.obstacle.includes(obstacle._id)) {
                            obstacle.checked = "true";
                        }
                    }
                    res.render("green_form", {
                        title: "Create Green",
                        obstacles: results.obstacles,
                        green,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        // Data from form is valid. Save Green.
        green.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new course record.
            res.redirect(green.url);
        });
    },
];

// Display green delete form on GET.
exports.green_delete_get = (req, res, next) => {
    async.parallel(
        {
            green: function (callback) {
                Green.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.green == null) {
                // No results
                res.redirect("/catalog/greens");
            }
            // Sucessful, so render
            res.render("green_delete", {
                title: "Delete Green",
                green: results.green
            });
        }
    );
};

// Handle green delete on POST.
exports.green_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    async.parallel(
        {
            green: function (callback) {
                Green.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            // Success
            console.log("results", results, results.green)
            if (results.green.obstacle.length > 0) {
                res.render("green_delete", {
                    title: "Delete Green",
                    green: results.green
                });
                return;
            } else {
                // green has no green objects. Delete object and redirect to the list of greens.
                Green.findByIdAndRemove(req.body.greenid, function deleteGreen(err) {
                    if (err) {
                        return next(err);
                    }
                    // Success - go to greens list.
                    res.redirect("/catalog/greens");
                });
            }
        }
    );
};

// Display green update form on GET.
exports.green_update_get = (req, res, next) => {
    // get the green and obstacles for the form.
    async.parallel(
        {
            green(callback) {
                Green.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
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
                        
            if (results.green == null) {
                // No, results
                const err = new Error("Green not found");
                err.status = 404;
                return next(err);
            }
            // Successful, mark our selected obstacles as checked
            for (const obstacle of results.obstacles) {
                for (const aObstacle of results.green.obstacle) {
                    if (obstacle._id.toString() === aObstacle._id.toString()) {
                        obstacle.checked = "true";
                    }
                }
            }
            res.render("green_form", {
                title: "Update Green",
                obstacles: results.obstacles,
                green: results.green,
            });
        }
    );
};

// Handle green update on POST.
exports.green_update_post = [
    // Convert obstacleto array.
    (req, res, next) => {
        if (!Array.isArray(req.body.obstacle)) {
            req.body.obstacle = typeof req.body.obstacle === "undefined" ? [] : [req.body.obstacle];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must be an integer.").trim().isInt().escape(),
    body("altitude", "Altitude must be integer.").trim().isInt().escape(),
    body("width", "width must be integer.").trim().isInt().escape(),
    body("width", "width must be integer.").trim().isInt().escape(),
    body("obstacle.*").escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a green object with escaped and trimmed data.
        const green = new Green({
            name: req.body.name,
            altitude: req.body.altitude,
            width: req.body.width,
            depth: req.body.depth,
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
                    res.render("green_form", {
                        title: "Update Green",
                        obstacles: results.obstacles,
                        green,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        
        // Data from form is valid. Update the record.
        Green.findByIdAndUpdate(req.params.id, green, {runValidators: true}, (err, thegreen) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to green detail page.
            res.redirect(thegreen.url);
        });
    },
]
