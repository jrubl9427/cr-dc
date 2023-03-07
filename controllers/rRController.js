// rRController.js

const async = require("async");
const RR = require("../models/rR");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all rRs.
exports.rR_list = (req, res, next) => {
    RR.find({})
        .exec(function (err, list_rRs) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("rR_list", {
                title: "RR List",
                rR_list: list_rRs
            });
        })
};

// Display detail page for a specific rR.
exports.rR_detail = (req, res, next) => {
    async.parallel(
        {
            rR(callback) {
                RR.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({rR: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.rR == null) {
                // No, results
                const err = new Error("RR not found");
                err.status = 404;
                return next(err);
            }
            res.render("rR_detail", {
                title: results.rR.name,
                rR: results.rR,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display rR create form on GET.
exports.rR_create_get = (req, res, next) => {
    res.render("rR_form", {
        title: "Create RR",
    });
};

// Handle rR create on POST.
exports.rR_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("carry_C", "Carry_C must be integer.").trim().isInt().escape(),
    body("layup_L", "Layup_L must be integer.").trim().isInt().escape(),
    body("inconsistent_I", "Inconsistent_I must be integer.").trim().isInt().escape(),
    body("mounds_M", "Mounds_M must be integer.").trim().isInt().escape(),
    body("unpleasant_U", "Unpleasant_U must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    body("parThree_3", "ParThree_3 must be integer.").trim().isInt().escape(),
    body("surrounded_S", "Surrounded_S must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a rR object with escaped and trimmed data.
        const rR = new RR({
            name: req.body.name + " rR",
            rating: req.body.rating,
            carry_C: req.body.carry_C,
            layup_L: req.body.layup_L,
            inconsistent_I: req.body.inconsistent_I,
            mounds_M: req.body.mounds_M,
            unpleasant_U: req.body.unpleasant_U,
            twoTimes_2: req.body.twoTimes_2,
            parThree_3: req.body.parThree_3,
            surrounded_S: req.body.surrounded_S,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("rR_form", {
                title: "Create RR",
                rR,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save rR.
        rR.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new rR record.
            res.redirect(rR.url);
        });
    },
];;

// Display rR delete form on GET.
exports.rR_delete_get = (req, res, next) => {
    async.parallel(
        {
            rR: function (callback) {
                RR.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.rR == null) {
                // No results
                res.redirect("/catalog/rRs");
            }
            // Sucessful, so render
            res.render("rR_delete", {
                title: "Delete RR",
                rR: results.rR
            });
        }
    );
};

// Handle rR delete on POST.
exports.rR_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    RR.findByIdAndRemove(req.body.rRid, function deleterR(err) {
        if (err) {
            return next(err);
        }
        // Success - go to rRs list.
        res.redirect("/catalog/rRs");
    });
};

// Display rR update form on GET.
exports.rR_update_get = (req, res, next) => {
    // get the rR and obstacles for the form.
    async.parallel(
        {
            rR(callback) {
                RR.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.rR == null) {
                // No, results
                const err = new Error("rR not found");
                err.status = 404;
                return next(err);
            }
            res.render("rR_form", {
                title: "Update RR",
                rR: results.rR,
            });
        }
    );
};

// Handle rR update on POST.
exports.rR_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("carry_C", "Carry_C must be integer.").trim().isInt().escape(),
    body("layup_L", "Layup_L must be integer.").trim().isInt().escape(),
    body("inconsistent_I", "Inconsistent_I must be integer.").trim().isInt().escape(),
    body("mounds_M", "Mounds_M must be integer.").trim().isInt().escape(),
    body("unpleasant_U", "Unpleasant_U must be integer.").trim().isInt().escape(),
    body("twoTimes_2", "TwoTimes_2 must be integer.").trim().isInt().escape(),
    body("parThree_3", "ParThree_3 must be integer.").trim().isInt().escape(),
    body("surrounded_S", "Surrounded_S must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a rR object with escaped and trimmed data.
        const rR = new RR({
            name: req.body.name,
            rating: req.body.rating,
            carry_C: req.body.carry_C,
            layup_L: req.body.layup_L,
            inconsistent_I: req.body.inconsistent_I,
            mounds_M: req.body.mounds_M,
            unpleasant_U: req.body.unpleasant_U,
            twoTimes_2: req.body.twoTimes_2,
            parThree_3: req.body.parThree_3,
            surrounded_S: req.body.surrounded_S,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("rR_form", {
                title: "Update RR",
                rR,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        RR.findByIdAndUpdate(req.params.id, rR, {runValidators: true}, (err, therR) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to rR detail page.
            res.redirect(therR.url);
        });
    },
]