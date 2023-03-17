// lateralController.js

const async = require("async");
const Lateral = require("../models/lateral");
const LzObstacle = require("../models/lzObstacle");
const GreenObstacle = require("../models/greenObstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all laterals.
exports.lateral_list = (req, res, next) => {
    Lateral.find({})
        .sort({ name: 1 })
        .exec(function (err, list_laterals) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("lateral_list", {
                title: "Lateral List",
                lateral_list: list_laterals
            });
        })
};

// Display detail page for a specific lateral.
exports.lateral_detail = (req, res, next) => {
    async.parallel(
        {
            lateral(callback) {
                Lateral.findById(req.params.id)
                    .exec(callback);
            },
            lzObstacle(callback) {
                LzObstacle.find({lateral: req.params.id})
                    .exec(callback);
            },
            greenObstacle(callback) {
                GreenObstacle.find({lateral: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.lateral == null) {
                // No, results
                const err = new Error("Lateral not found");
                err.status = 404;
                return next(err);
            }
            res.render("lateral_detail", {
                title: results.lateral.name,
                lateral: results.lateral,
                lzObstacle: results.lzObstacle,
                greenObstacle: results.greenObstacle
            });
        }
    )
};

// Display lateral create form on GET.
exports.lateral_create_get = (req, res, next) => {
    res.render("lateral_form", {
        title: "Create Lateral",
    });
};

// Handle lateral create on POST.
exports.lateral_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("percentage_P", "Percentage_P must be integer.").trim().isInt().escape(),
    body("bounce_B", "Bounce_B must be integer.").trim().isInt().escape(),
    body("squeeze_Q", "Squeeze_Q must be integer.").trim().isInt().escape(),
    body("stroke_K", "Stroke_K must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    body("surrounded_S", "Surrounded_S must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a lateral object with escaped and trimmed data.
        const lateral = new Lateral({
            name: req.body.name + " lateral",
            rating: req.body.rating,
            percentage_P: req.body.percentage_P,
            bounce_B: req.body.bounce_B,
            squeeze_Q: req.body.squeeze_Q,
            stroke_K: req.body.stroke_K,
            twoTimes_2: req.body.twoTimes_2,
            surrounded_S: req.body.surrounded_S,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("lateral_form", {
                title: "Create Lateral",
                lateral,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save lateral.
        lateral.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new lateral record.
            res.redirect(lateral.url);
        });
    },
];;

// Display lateral delete form on GET.
exports.lateral_delete_get = (req, res, next) => {
    async.parallel(
        {
            lateral: function (callback) {
                Lateral.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.lateral == null) {
                // No results
                res.redirect("/catalog/laterals");
            }
            // Sucessful, so render
            res.render("lateral_delete", {
                title: "Delete Lateral",
                lateral: results.lateral
            });
        }
    );
};

// Handle lateral delete on POST.
exports.lateral_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Lateral.findByIdAndRemove(req.body.lateralid, function deletelateral(err) {
        if (err) {
            return next(err);
        }
        // Success - go to laterals list.
        res.redirect("/catalog/laterals");
    });
};

// Display lateral update form on GET.
exports.lateral_update_get = (req, res, next) => {
    // get the lateral and lzObstacles for the form.
    async.parallel(
        {
            lateral(callback) {
                Lateral.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.lateral == null) {
                // No, results
                const err = new Error("lateral not found");
                err.status = 404;
                return next(err);
            }
            res.render("lateral_form", {
                title: "Update Lateral",
                lateral: results.lateral,
            });
        }
    );
};

// Handle lateral update on POST.
exports.lateral_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("percentage_P", "Percentage_P must be integer.").trim().isInt().escape(),
    body("bounce_B", "Bounce_B must be integer.").trim().isInt().escape(),
    body("squeeze_Q", "Squeeze_Q must be integer.").trim().isInt().escape(),
    body("stroke_K", "Stroke_K must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    body("surrounded_S", "Surrounded_S must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a lateral object with escaped and trimmed data.
        const lateral = new Lateral({
            name: req.body.name,
            rating: req.body.rating,
            percentage_P: req.body.percentage_P,
            bounce_B: req.body.bounce_B,
            squeeze_Q: req.body.squeeze_Q,
            stroke_K: req.body.stroke_K,
            twoTimes_2: req.body.twoTimes_2,
            surrounded_S: req.body.surrounded_S,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("lateral_form", {
                title: "Update Lateral",
                lateral,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Lateral.findByIdAndUpdate(req.params.id, lateral, {runValidators: true}, (err, thelateral) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to lateral detail page.
            res.redirect(thelateral.url);
        });
    },
]