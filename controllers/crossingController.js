// crossingController.js

const async = require("async");
const Crossing = require("../models/crossing");
const LzObstacle = require("../models/lzObstacle");
const TeeObstacle = require("../models/teeObstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all crossings.
exports.crossing_list = (req, res, next) => {
    Crossing.find({})
        .sort({ name: 1 })
        .exec(function (err, list_crossings) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("crossing_list", {
                title: "Crossing List",
                crossing_list: list_crossings
            });
        })
};

// Display detail page for a specific crossing.
exports.crossing_detail = (req, res, next) => {
    async.parallel(
        {
            crossing(callback) {
                Crossing.findById(req.params.id)
                    .exec(callback);
            },
            lzObstacle(callback) {
                LzObstacle.find({crossing: req.params.id})
                    .exec(callback);
            },
            teeObstacle(callback) {
                TeeObstacle.find({crossing: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.crossing == null) {
                // No, results
                const err = new Error("Crossing not found");
                err.status = 404;
                return next(err);
            }
            res.render("crossing_detail", {
                title: results.crossing.name,
                crossing: results.crossing,
                lzObstacle: results.lzObstacle,
                teeObstacle: results.teeObstacle
            });
        }
    )
};

// Display crossing create form on GET.
exports.crossing_create_get = (req, res, next) => {
    res.render("crossing_form", {
        title: "Create Crossing",
    });
};

// Handle crossing create on POST.
exports.crossing_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("percentage_P", "Percentage_P must be integer.").trim().isInt().escape(),
    body("carry_C", "Carry_C must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a crossing object with escaped and trimmed data.
        const crossing = new Crossing({
            name: req.body.name + " crossing",
            rating: req.body.rating,
            percentage_P: req.body.percentage_P,
            carry_C: req.body.carry_C,
            twoTimes_2: req.body.twoTimes_2,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("crossing_form", {
                title: "Create Crossing",
                crossing,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save crossing.
        crossing.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new crossing record.
            res.redirect(crossing.url);
        });
    },
];;

// Display crossing delete form on GET.
exports.crossing_delete_get = (req, res, next) => {
    async.parallel(
        {
            crossing: function (callback) {
                Crossing.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.crossing == null) {
                // No results
                res.redirect("/catalog/crossings");
            }
            // Sucessful, so render
            res.render("crossing_delete", {
                title: "Delete Crossing",
                crossing: results.crossing
            });
        }
    );
};

// Handle crossing delete on POST.
exports.crossing_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Crossing.findByIdAndRemove(req.body.crossingid, function deletecrossing(err) {
        if (err) {
            return next(err);
        }
        // Success - go to crossings list.
        res.redirect("/catalog/crossings");
    });
};

// Display crossing update form on GET.
exports.crossing_update_get = (req, res, next) => {
    // get the crossing and lzObstacles for the form.
    async.parallel(
        {
            crossing(callback) {
                Crossing.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.crossing == null) {
                // No, results
                const err = new Error("crossing not found");
                err.status = 404;
                return next(err);
            }
            res.render("crossing_form", {
                title: "Update Crossing",
                crossing: results.crossing,
            });
        }
    );
};

// Handle crossing update on POST.
exports.crossing_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("percentage_P", "Percentage_P must be integer.").trim().isInt().escape(),
    body("carry_C", "Carry_C must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a crossing object with escaped and trimmed data.
        const crossing = new Crossing({
            name: req.body.name,
            rating: req.body.rating,
            percentage_P: req.body.percentage_P,
            carry_C: req.body.carry_C,
            twoTimes_2: req.body.twoTimes_2,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("crossing_form", {
                title: "Update Crossing",
                crossing,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Crossing.findByIdAndUpdate(req.params.id, crossing, {runValidators: true}, (err, thecrossing) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to crossing detail page.
            res.redirect(thecrossing.url);
        });
    },
]
