// rollController.js

const async = require("async");
const Roll = require("../models/roll");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all rolls.
exports.roll_list = (req, res, next) => {
    Roll.find({})
        .exec(function (err, list_rolls) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("roll_list", {
                title: "Roll List",
                roll_list: list_rolls
            });
        })
};

// Display detail page for a specific roll.
exports.roll_detail = (req, res, next) => {
    async.parallel(
        {
            roll(callback) {
                Roll.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({roll: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.roll == null) {
                // No, results
                const err = new Error("Roll not found");
                err.status = 404;
                return next(err);
            }
            res.render("roll_detail", {
                title: results.roll.name,
                roll: results.roll,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display roll create form on GET.
exports.roll_create_get = (req, res, next) => {
    res.render("roll_form", {
        title: "Create Roll",
    });
};

// Handle roll create on POST.
exports.roll_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("effectiveLengthAdjust", "effectiveLengthAdjust must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    body("firm_F", "firm_F must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a roll object with escaped and trimmed data.
        const roll = new Roll({
            name: req.body.name + " roll",
            rating: req.body.rating,
            effectiveLengthAdjust: req.body.effectiveLengthAdjust,
            twoTimes_2: req.body.twoTimes_2,
            firm_F: req.body.firm_F,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("roll_form", {
                title: "Create Roll",
                roll,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save roll.
        roll.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new roll record.
            res.redirect(roll.url);
        });
    },
];;

// Display roll delete form on GET.
exports.roll_delete_get = (req, res, next) => {
    async.parallel(
        {
            roll: function (callback) {
                Roll.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.roll == null) {
                // No results
                res.redirect("/catalog/rolls");
            }
            // Sucessful, so render
            res.render("roll_delete", {
                title: "Delete Roll",
                roll: results.roll
            });
        }
    );
};

// Handle roll delete on POST.
exports.roll_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Roll.findByIdAndRemove(req.body.rollid, function deleteroll(err) {
        if (err) {
            return next(err);
        }
        // Success - go to rolls list.
        res.redirect("/catalog/rolls");
    });
};

// Display roll update form on GET.
exports.roll_update_get = (req, res, next) => {
    // get the roll and obstacles for the form.
    async.parallel(
        {
            roll(callback) {
                Roll.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.roll == null) {
                // No, results
                const err = new Error("roll not found");
                err.status = 404;
                return next(err);
            }
            res.render("roll_form", {
                title: "Update Roll",
                roll: results.roll,
            });
        }
    );
};

// Handle roll update on POST.
exports.roll_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("effectiveLengthAdjust", "effectiveLengthAdjust must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    body("firm_F", "Firm_F must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a roll object with escaped and trimmed data.
        const roll = new Roll({
            name: req.body.name,
            rating: req.body.rating,
            effectiveLengthAdjust: req.body.effectiveLengthAdjust,
            twoTimes_2: req.body.twoTimes_2,
            firm_F: req.body.firm_F,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("roll_form", {
                title: "Update Roll",
                roll,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Roll.findByIdAndUpdate(req.params.id, roll, {runValidators: true}, (err, theroll) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to roll detail page.
            res.redirect(theroll.url);
        });
    },
]
