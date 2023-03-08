// bunkerController.js

const async = require("async");
const Bunker = require("../models/bunker");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all bunkers.
exports.bunker_list = (req, res, next) => {
    Bunker.find({})
        .exec(function (err, list_bunkers) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("bunker_list", {
                title: "Bunker List",
                bunker_list: list_bunkers
            });
        })
};

// Display detail page for a specific bunker.
exports.bunker_detail = (req, res, next) => {
    async.parallel(
        {
            bunker(callback) {
                Bunker.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({bunker: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.bunker == null) {
                // No, results
                const err = new Error("Bunker not found");
                err.status = 404;
                return next(err);
            }
            res.render("bunker_detail", {
                title: results.bunker.name,
                bunker: results.bunker,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display Bunker create form on GET.
exports.bunker_create_get = (req, res, next) => {
    res.render("bunker_form", {
        title: "Create Bunker",
    });
};

// Handle bunker create on POST.
exports.bunker_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("carry_C", "Carry_C must be integer.").trim().isInt().escape(),
    body("depth_D", "Depth_D must be integer.").trim().isInt().escape(),
    body("extreme_E", "Extreme_E must be integer.").trim().isInt().escape(),
    body("no_N", "No_N must be integer.").trim().isInt().escape(),
    body("squeeze_Q", "Squeeze_Q must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a bunker object with escaped and trimmed data.
        const bunker = new Bunker({
            name: req.body.name + " bunker",
            rating: req.body.rating,
            carry_C: req.body.carry_C,
            depth_D: req.body.depth_D,
            extreme_E: req.body.extreme_E,
            no_N: req.body.no_N,
            squeeze_Q: req.body.squeeze_Q,
            twoTimes_2: req.body.twoTimes_2,
            
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("bunker_form", {
                title: "Create Bunker",
                bunker,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save bunker.
        bunker.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new bunker record.
            res.redirect(bunker.url);
        });
    },
];;

// Display bunker delete form on GET.
exports.bunker_delete_get = (req, res, next) => {
    async.parallel(
        {
            bunker: function (callback) {
                Bunker.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.bunker == null) {
                // No results
                res.redirect("/catalog/bunkers");
            }
            // Sucessful, so render
            res.render("bunker_delete", {
                title: "Delete Bunker",
                bunker: results.bunker
            });
        }
    );
};

// Handle bunker delete on POST.
exports.bunker_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Bunker.findByIdAndRemove(req.body.bunkerid, function deletebunker(err) {
        if (err) {
            return next(err);
        }
        // Success - go to bunkers list.
        res.redirect("/catalog/bunkers");
    });
};

// Display bunker update form on GET.
exports.bunker_update_get = (req, res, next) => {
    // get the bunker and obstacles for the form.
    async.parallel(
        {
            bunker(callback) {
                Bunker.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.bunker == null) {
                // No, results
                const err = new Error("Bunker not found");
                err.status = 404;
                return next(err);
            }
            res.render("bunker_form", {
                title: "Update Bunker",
                bunker: results.bunker,
            });
        }
    );
};

// Handle bunker update on POST.
exports.bunker_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("carry_C", "Carry_C must be integer.").trim().isInt().escape(),
    body("depth_D", "Depth_D must be integer.").trim().isInt().escape(),
    body("extreme_E", "Extreme_E must be integer.").trim().isInt().escape(),
    body("no_N", "No_N must be integer.").trim().isInt().escape(),
    body("squeeze_Q", "Squeeze_Q must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a bunker object with escaped and trimmed data.
        const bunker = new Bunker({
            name: req.body.name,
            rating: req.body.rating,
            carry_C: req.body.carry_C,
            depth_D: req.body.depth_D,
            extreme_E: req.body.extreme_E,
            no_N: req.body.no_N,
            squeeze_Q: req.body.squeeze_Q,
            twoTimes_2: req.body.twoTimes_2,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("bunker_form", {
                title: "Update Bunker",
                bunker,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Bunker.findByIdAndUpdate(req.params.id, bunker, {runValidators: true}, (err, thebunker) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to bunker detail page.
            res.redirect(thebunker.url);
        });
    },
]