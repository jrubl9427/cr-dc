// fairwayController.js

const async = require("async");
const Fairway = require("../models/fairway");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all fairways.
exports.fairway_list = (req, res, next) => {
    Fairway.find({})
        .exec(function (err, list_fairways) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("fairway_list", {
                title: "Fairway List",
                fairway_list: list_fairways
            });
        })
};

// Display detail page for a specific fairway.
exports.fairway_detail = (req, res, next) => {
    async.parallel(
        {
            fairway(callback) {
                Fairway.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({fairway: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.fairway == null) {
                // No, results
                const err = new Error("Fairway not found");
                err.status = 404;
                return next(err);
            }
            res.render("fairway_detail", {
                title: results.fairway.name,
                fairway: results.fairway,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display fairway create form on GET.
exports.fairway_create_get = (req, res, next) => {
    res.render("fairway_form", {
        title: "Create Fairway",
    });
};

// Handle Fairway create on POST.
exports.fairway_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("layup_L", "layup_L must be integer.").trim().isInt().escape(),
    body("visibility_V", "visibility_V must be integer.").trim().isInt().escape(),
    body("width_W", "width_W must be integer.").trim().isInt().escape(),
    body("unpleasant_U", "unpleasant_U must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a fairway object with escaped and trimmed data.
        const fairway = new Fairway({
            name: req.body.name + " fairway",
            rating: req.body.rating,
            layup_L: req.body.layup_L,
            visibility_V: req.body.visibility_V,
            width_W: req.body.width_W,
            unpleasant_U: req.body.unpleasant_U,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("fairway_form", {
                title: "Create Fairway",
                fairway,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save fairway.
        fairway.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new fairway record.
            res.redirect(fairway.url);
        });
    },
];;

// Display fairway delete form on GET.
exports.fairway_delete_get = (req, res, next) => {
    async.parallel(
        {
            fairway: function (callback) {
                Fairway.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.fairway == null) {
                // No results
                res.redirect("/catalog/fairways");
            }
            // Sucessful, so render
            res.render("fairway_delete", {
                title: "Delete Fairway",
                fairway: results.fairway
            });
        }
    );
};

// Handle fairway delete on POST.
exports.fairway_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Fairway.findByIdAndRemove(req.body.fairwayid, function deletefairway(err) {
        if (err) {
            return next(err);
        }
        // Success - go to fairways list.
        res.redirect("/catalog/fairways");
    });
};

// Display fairway update form on GET.
exports.fairway_update_get = (req, res, next) => {
    // get the fairway and obstacles for the form.
    async.parallel(
        {
            fairway(callback) {
                Fairway.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.fairway == null) {
                // No, results
                const err = new Error("Fairway not found");
                err.status = 404;
                return next(err);
            }
            res.render("fairway_form", {
                title: "Update Fairway",
                fairway: results.fairway,
            });
        }
    );
};

// Handle fairway update on POST.
exports.fairway_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("layup_L", "layup_L must be integer.").trim().isInt().escape(),
    body("visibility_V", "visibility_V must be integer.").trim().isInt().escape(),
    body("width_W", "width_W must be integer.").trim().isInt().escape(),
    body("unpleasant_U", "unpleasant_U must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a fairway object with escaped and trimmed data.
        const fairway = new Fairway({
            name: req.body.name,
            rating: req.body.rating,
            layup_L: req.body.layup_L,
            visibility_V: req.body.visibility_V,
            width_W: req.body.width_W,
            unpleasant_U: req.body.unpleasant_U,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("fairway_form", {
                title: "Update Fairway",
                fairway,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Fairway.findByIdAndUpdate(req.params.id, fairway, {}, (err, thefairway) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to fairway detail page.
            res.redirect(thefairway.url);
        });
    },
]