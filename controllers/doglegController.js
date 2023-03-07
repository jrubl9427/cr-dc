// doglegController.js

const async = require("async");
const Dogleg = require("../models/dogleg");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all doglegs.
exports.dogleg_list = (req, res, next) => {
    Dogleg.find({})
        .exec(function (err, list_doglegs) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("dogleg_list", {
                title: "Dogleg List",
                dogleg_list: list_doglegs
            });
        })
};

// Display detail page for a specific dogleg.
exports.dogleg_detail = (req, res, next) => {
    async.parallel(
        {
            dogleg(callback) {
                Dogleg.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({dogleg: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.dogleg == null) {
                // No, results
                const err = new Error("Dogleg not found");
                err.status = 404;
                return next(err);
            }
            res.render("dogleg_detail", {
                title: results.dogleg.name,
                dogleg: results.dogleg,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display dogleg create form on GET.
exports.dogleg_create_get = (req, res, next) => {
    res.render("dogleg_form", {
        title: "Create Dogleg",
    });
};

// Handle dogleg create on POST.
exports.dogleg_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("effectiveLengthAdjust", "EffectiveLengthAdjust must be integer.").trim().isInt().escape(),
    body("length", "Length must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a dogleg object with escaped and trimmed data.
        const dogleg = new Dogleg({
            name: req.body.name,
            effectiveLengthAdjust: req.body.effectiveLengthAdjust,
            length: req.body.length,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("dogleg_form", {
                title: "Create Dogleg",
                dogleg,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save dogleg.
        dogleg.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new dogleg record.
            res.redirect(dogleg.url);
        });
    },
];;

// Display dogleg delete form on GET.
exports.dogleg_delete_get = (req, res, next) => {
    async.parallel(
        {
            dogleg: function (callback) {
                Dogleg.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.dogleg == null) {
                // No results
                res.redirect("/catalog/doglegs");
            }
            // Sucessful, so render
            res.render("dogleg_delete", {
                title: "Delete Dogleg",
                dogleg: results.dogleg
            });
        }
    );
};

// Handle dogleg delete on POST.
exports.dogleg_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Dogleg.findByIdAndRemove(req.body.doglegid, function deleteDogleg(err) {
        if (err) {
            return next(err);
        }
        // Success - go to doglegs list.
        res.redirect("/catalog/doglegs");
    });
};

// Display dogleg update form on GET.
exports.dogleg_update_get = (req, res, next) => {
    // get the dogleg and obstacles for the form.
    async.parallel(
        {
            dogleg(callback) {
                Dogleg.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.dogleg == null) {
                // No, results
                const err = new Error("Dogleg not found");
                err.status = 404;
                return next(err);
            }
            res.render("dogleg_form", {
                title: "Update Dogleg",
                dogleg: results.dogleg,
            });
        }
    );
};

// Handle dogleg update on POST.
exports.dogleg_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("effectiveLengthAdjust", "EffectiveLengthAdjust must be integer.").trim().isInt().escape(),
    body("length", "Length must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a dogleg object with escaped and trimmed data.
        const dogleg = new Dogleg({
            name: req.body.name,
            effectiveLengthAdjust: req.body.effectiveLengthAdjust,
            length: req.body.length,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("dogleg_form", {
                title: "Update Dogleg",
                dogleg,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Dogleg.findByIdAndUpdate(req.params.id, dogleg, {}, (err, thedogleg) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to dogleg detail page.
            res.redirect(thedogleg.url);
        });
    },
]
