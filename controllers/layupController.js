// layupController.js


const async = require("async");
const Layup = require("../models/layup");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all layups.
exports.layup_list = (req, res, next) => {
    Layup.find({})
        .exec(function (err, list_layups) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("layup_list", {
                title: "Layup List",
                layup_list: list_layups
            });
        })
};

// Display detail page for a specific layup.
exports.layup_detail = (req, res, next) => {
    async.parallel(
        {
            layup(callback) {
                Layup.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({layup: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.layup == null) {
                // No, results
                const err = new Error("Layup not found");
                err.status = 404;
                return next(err);
            }
            res.render("layup_detail", {
                title: results.layup.name,
                layup: results.layup,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display layup create form on GET.
exports.layup_create_get = (req, res, next) => {
    res.render("layup_form", {
        title: "Create Layup",
    });
};

// Handle layup create on POST.
exports.layup_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("effectiveLengthAdjust", "EffectiveLengthAdjust must be integer.").trim().isInt().escape(),
    body("length", "Length must be integer.").trim().isInt().escape(),
    body("typeLayup", "TypeLayup must be integer.").trim().isLength({ min: 1 }).escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a layup object with escaped and trimmed data.
        const layup = new Layup({
            name: req.body.name + " layup",
            effectiveLengthAdjust: req.body.effectiveLengthAdjust,
            length: req.body.length,
            typeLayup: req.body.typeLayup,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("layup_form", {
                title: "Create Layup",
                layup,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save Layup.
        layup.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new layup record.
            res.redirect(layup.url);
        });
    },
];;

// Display layup delete form on GET.
exports.layup_delete_get = (req, res, next) => {
    async.parallel(
        {
            layup: function (callback) {
                Layup.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.layup == null) {
                // No results
                res.redirect("/catalog/layups");
            }
            // Sucessful, so render
            res.render("layup_delete", {
                title: "Delete layup",
                layup: results.layup
            });
        }
    );
};

// Handle layup delete on POST.
exports.layup_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Layup.findByIdAndRemove(req.body.layupid, function deletelayup(err) {
        if (err) {
            return next(err);
        }
        // Success - go to layups list.
        res.redirect("/catalog/layups");
    });
};

// Display layup update form on GET.
exports.layup_update_get = (req, res, next) => {
    // get the layup and obstacles for the form.
    async.parallel(
        {
            layup(callback) {
                Layup.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.layup == null) {
                // No, results
                const err = new Error("Layup not found");
                err.status = 404;
                return next(err);
            }
            res.render("layup_form", {
                title: "Update Layup",
                layup: results.layup,
            });
        }
    );
};

// Handle layup update on POST.
exports.layup_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("effectiveLengthAdjust", "EffectiveLengthAdjust must be integer.").trim().isInt().escape(),
    body("length", "Length must be integer.").trim().isInt().escape(),
    body("typeLayup", "TypeLayup must be integer.").trim().isLength({ min: 1 }).escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a layup object with escaped and trimmed data.
        const layup = new Layup({
            name: req.body.name,
            effectiveLengthAdjust: req.body.effectiveLengthAdjust,
            length: req.body.length,
            typeLayup: req.body.typeLayup,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("layup_form", {
                title: "Update Layup",
                layup,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Layup.findByIdAndUpdate(req.params.id, layup, {}, (err, thelayup) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to layup detail page.
            res.redirect(thelayup.url);
        });
    },
]
