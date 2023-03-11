// teeController.js

const Tee = require("../models/tee");
const TeeObstacle = require("../models/teeObstacle");
const async = require("async");
const { body, validationResult } = require("express-validator");
const { ObjectID, ObjectId } = require("bson");


// Display a list of all tees.
exports.tee_list = (req, res, next) => {
    Tee.find({})
        .sort({ name: 1 })
        .exec(function (err, list_tees) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("tee_list", {
                    title: "Tee List",
                    tee_list: list_tees
                });
            }
        });
};

// Display detail page for a specific tee.
exports.tee_detail = (req, res, next) => {
    async.parallel(
        {
            tee(callback) {
                Tee.findById(req.params.id)
                    .populate("teeObstacle")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.tee == null) {
                // No, results
                const err = new Error("Tee not found");
                err.status = 404;
                return next(err);
            }
            res.render("tee_detail", {
                title: results.tee.name,
                tee: results.tee
            });
        }
    );
};

// Display tee create form on GET.
exports.tee_create_get = (req, res, next) => {
    // Get all teeObstacles .
    async.parallel(
        {
            teeObstacles(callback) {
                TeeObstacle.find({})
                    .sort({ name: 1 })
                    .exec(callback);;
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render("tee_form", {
                title: "Create Tee",
                teeObstacles: results.teeObstacles
            });
        }
    );
};

// Handle tee create on POST.
exports.tee_create_post = [
    // Convert teeObstacle to array.
    (req, res, next) => {
        if (!Array.isArray(req.body.teeObstacle)) {
            req.body.teeObstacle = typeof req.body.teeObstacle === "undefined" ? [] : [req.body.teeObstacle];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("length", "Length must be integer.").trim().isInt().escape(),
    body("par", "Par must be integer.").trim().isInt().escape(),
    body("altitude", "Altitude must be integer.").trim().isInt().escape(),
    body("teeObstacle.*").escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Tee object with escaped and trimmed data.
        const tee = new Tee({
            name: req.body.name,
            length: req.body.length,
            par: req.body.par,
            altitude: req.body.altitude,
            teeObstacle: req.body.teeObstacle
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all teeObstacles for form.
            
            // Get all teeObstacles for the form
            async.parallel(
                {
                    teeObstacles(callback) {
                        TeeObstacle.find(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }

                    // Mark selected teeObstacles as checked and render.
                    for (const teeObstacle of results.teeObstacles) {
                        if (tee.teeObstacle.includes(teeObstacle._id)) {
                            teeObstacle.checked = "true";
                        }
                    }
                    res.render("tee_form", {
                        title: "Create Tee",
                        teeObstacles: results.teeObstacles,
                        tee,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        // Data from form is valid. Save Tee.
        tee.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new course record.
            res.redirect(tee.url);
        });
    },
];

// Display tee delete form on GET.
exports.tee_delete_get = (req, res, next) => {
    async.parallel(
        {
            tee: function (callback) {
                Tee.findById(req.params.id)
                    .populate("teeObstacle")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.tee == null) {
                // No results
                res.redirect("/catalog/tees");
            }
            // Sucessful, so render
            res.render("tee_delete", {
                title: "Delete Tee",
                tee: results.tee
            });
        }
    );
};

// Handle tee delete on POST.
exports.tee_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    async.parallel(
        {
            tee: function (callback) {
                Tee.findById(req.params.id)
                    .populate("teeObstacle")
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            // Success
            if (results.tee.teeObstacle.length > 0) {
                res.render("tee_delete", {
                    title: "Delete Tee",
                    tee: results.tee
                });
                return;
            } else {
                // Tee has no tee objects. Delete object and redirect to the list of tees.
                Tee.findByIdAndRemove(req.body.teeid, function deleteTee(err) {
                    if (err) {
                        return next(err);
                    }
                    // Success - go to tees list.
                    res.redirect("/catalog/tees");
                });
            }
        }
    );
};

// Display tee update form on GET.
exports.tee_update_get = (req, res, next) => {
    // get the tee and teeObstacles for the form.
    async.parallel(
        {
            tee(callback) {
                Tee.findById(req.params.id)
                    .populate("teeObstacle")
                    .exec(callback);
            },
            teeObstacles(callback) {
                TeeObstacle.find(callback)
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.tee == null) {
                // No, results
                const err = new Error("Tee not found");
                err.status = 404;
                return next(err);
            }
            // Successful, mark our selected teeObstacles as checked
            for (const teeObstacle of results.teeObstacles) {
                for (const ateeObstacle of results.tee.teeObstacle) {
                    if (teeObstacle._id.toString() === ateeObstacle._id.toString()) {
                        teeObstacle.checked = "true";
                    }
                }
            }
            res.render("tee_form", {
                title: "Update Tee",
                teeObstacles: results.teeObstacles,
                tee: results.tee,
            });
        }
    );
};

// Handle tee update on POST.
exports.tee_update_post = [
    // Convert teeObstacleto array.
    (req, res, next) => {

        if (!Array.isArray(req.body.teeObstacle)) {
            req.body.teeObstacle = typeof req.body.teeObstacle === "undefined" ? [] : [req.body.teeObstacle];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("length", "Length must be integer.").trim().isInt().escape(),
    body("par", "Par must be integer.").trim().isInt().escape(),
    body("altitude", "Altitude must be integer.").trim().isInt().escape(),
    body("teeObstacle.*").escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Tee object with escaped and trimmed data.
        const tee = new Tee({
            name: req.body.name,
            length: req.body.length,
            par: req.body.par,
            altitude: req.body.altitude,
            teeObstacle: typeof req.body.teeObstacle === "undefined" ? [] : req.body.teeObstacle,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all teeObstacles for form.
            
            // Get all teeObstacles for the form
            async.parallel(
                {
                    teeObstacles(callback) {
                        TeeObstacle.find(callback);
                    }
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    res.render("tee_form", {
                        title: "Update Tee",
                        teeObstacles: results.teeObstacles,
                        tee,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        
        // Data from form is valid. Update the record.
        Tee.findByIdAndUpdate(req.params.id, tee, {runValidators: true}, (err, thetee) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to tee detail page.
            res.redirect(thetee.url);
        });
    },
]
