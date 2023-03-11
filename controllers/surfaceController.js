// surfaceController.js

const async = require("async");
const Surface = require("../models/surface");
const GreenObstacle = require("../models/greenObstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all surfaces.
exports.surface_list = (req, res, next) => {
    Surface.find({})
        .exec(function (err, list_surfaces) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("surface_list", {
                title: "Surface List",
                surface_list: list_surfaces
            });
        })
};

// Display detail page for a specific surface.
exports.surface_detail = (req, res, next) => {
    async.parallel(
        {
            surface(callback) {
                Surface.findById(req.params.id)
                    .exec(callback);
            },
            greenObstacle(callback) {
                GreenObstacle.find({surface: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.surface == null) {
                // No, results
                const err = new Error("Surface not found");
                err.status = 404;
                return next(err);
            }
            res.render("surface_detail", {
                title: results.surface.name,
                surface: results.surface,
                greenObstacle: results.greenObstacle,
            });
        }
    )
};

// Display surface create form on GET.
exports.surface_create_get = (req, res, next) => {
    res.render("surface_form", {
        title: "Create Surface",
    });
};

// Handle surface create on POST.
exports.surface_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("tiered_T", "Tiered_T must be integer.").trim().isInt().escape(),
    body("unpleasant_U", "Unpleasant_U must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a surface object with escaped and trimmed data.
        const surface = new Surface({
            name: req.body.name + " surface",
            rating: req.body.rating,
            tiered_T: req.body.tiered_T,
            unpleasant_U: req.body.unpleasant_U,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("surface_form", {
                title: "Create Surface",
                surface,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save surface.
        surface.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new surface record.
            res.redirect(surface.url);
        });
    },
];;

// Display surface delete form on GET.
exports.surface_delete_get = (req, res, next) => {
    async.parallel(
        {
            surface: function (callback) {
                Surface.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.surface == null) {
                // No results
                res.redirect("/catalog/surfaces");
            }
            // Sucessful, so render
            res.render("surface_delete", {
                title: "Delete Surface",
                surface: results.surface
            });
        }
    );
};

// Handle surface delete on POST.
exports.surface_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Surface.findByIdAndRemove(req.body.surfaceid, function deletesurface(err) {
        if (err) {
            return next(err);
        }
        // Success - go to surfaces list.
        res.redirect("/catalog/surfaces");
    });
};

// Display surface update form on GET.
exports.surface_update_get = (req, res, next) => {
    // get the surface and greenObstacles for the form.
    async.parallel(
        {
            surface(callback) {
                Surface.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.surface == null) {
                // No, results
                const err = new Error("Surface not found");
                err.status = 404;
                return next(err);
            }
            res.render("surface_form", {
                title: "Update Surface",
                surface: results.surface,
            });
        }
    );
};

// Handle surface update on POST.
exports.surface_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("tiered_T", "Tiered_T must be integer.").trim().isInt().escape(),
    body("unpleasant_U", "Unpleasant_U must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a surface object with escaped and trimmed data.
        const surface = new Surface({
            name: req.body.name,
            rating: req.body.rating,
            tiered_T: req.body.tiered_T,
            unpleasant_U: req.body.unpleasant_U,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("surface_form", {
                title: "Update Surface",
                surface,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Surface.findByIdAndUpdate(req.params.id, surface, {runValidators: true}, (err, thesurface) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to surface detail page.
            res.redirect(thesurface.url);
        });
    },
]
