// targetController.js

const async = require("async");
const Target = require("../models/target");
const LzObstacle = require("../models/lzObstacle");
const TeeObstacle = require("../models/teeObstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all targets.
exports.target_list = (req, res, next) => {
    Target.find({})
        .sort({ name: 1 })
        .exec(function (err, list_targets) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("target_list", {
                title: "Target List",
                target_list: list_targets
            });
        })
};

// Display detail page for a specific target.
exports.target_detail = (req, res, next) => {
    async.parallel(
        {
            target(callback) {
                Target.findById(req.params.id)
                    .exec(callback);
            },
            lzObstacle(callback) {
                LzObstacle.find({target: req.params.id})
                    .exec(callback);
            },
            teeObstacle(callback) {
                TeeObstacle.find({target: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.target == null) {
                // No, results
                const err = new Error("Target not found");
                err.status = 404;
                return next(err);
            }
            res.render("target_detail", {
                title: results.target.name,
                target: results.target,
                lzObstacle: results.lzObstacle,
                teeObstacle: results.teeObstacle
            });
        }
    )
};

// Display target create form on GET.
exports.target_create_get = (req, res, next) => {
    res.render("target_form", {
        title: "Create Target",
    });
};

// Handle target create on POST.
exports.target_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("obstructed_O", "Obstructed_O must be integer.").trim().isInt().escape(),
    body("visibility_V", "Visibility_V must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a target object with escaped and trimmed data.
        const target = new Target({
            name: req.body.name + " target",
            rating: req.body.rating,
            obstructed_O: req.body.obstructed_O,
            visibility_V: req.body.visibility_V,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("target_form", {
                title: "Create Target",
                target,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save target.
        target.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new target record.
            res.redirect(target.url);
        });
    },
];;

// Display target delete form on GET.
exports.target_delete_get = (req, res, next) => {
    async.parallel(
        {
            target: function (callback) {
                Target.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.target == null) {
                // No results
                res.redirect("/catalog/targets");
            }
            // Sucessful, so render
            res.render("target_delete", {
                title: "Delete Target",
                target: results.target
            });
        }
    );
};

// Handle target delete on POST.
exports.target_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Target.findByIdAndRemove(req.body.targetid, function deletetarget(err) {
        if (err) {
            return next(err);
        }
        // Success - go to targets list.
        res.redirect("/catalog/targets");
    });
};

// Display target update form on GET.
exports.target_update_get = (req, res, next) => {
    // get the target and lzObstacles for the form.
    async.parallel(
        {
            target(callback) {
                Target.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.target == null) {
                // No, results
                const err = new Error("Target not found");
                err.status = 404;
                return next(err);
            }
            res.render("target_form", {
                title: "Update Target",
                target: results.target,
            });
        }
    );
};

// Handle target update on POST.
exports.target_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("obstructed_O", "Obstructed_O must be integer.").trim().isInt().escape(),
    body("visibility_V", "Visibility_V must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a target object with escaped and trimmed data.
        const target = new Target({
            name: req.body.name,
            rating: req.body.rating,
            obstructed_O: req.body.obstructed_O,
            visibility_V: req.body.visibility_V,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("target_form", {
                title: "Update Target",
                target,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Target.findByIdAndUpdate(req.params.id, target, {runValidators: true}, (err, thetarget) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to target detail page.
            res.redirect(thetarget.url);
        });
    },
]