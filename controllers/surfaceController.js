// surfaceController.js

const async = require("async");
const Surface = require("../models/surface");
const Obstacle = require("../models/obstacle");
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
            obstacle(callback) {
                Obstacle.find({surface: req.params.id})
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
                obstacle: results.obstacle,
            });
        }
    )
};

// Display surface create form on GET.
exports.surface_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: surface create GET");
};

// Handle surface create on POST.
exports.surface_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: surface create POST");
};

// Display surface delete form on GET.
exports.surface_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: surface delete GET");
};

// Handle surface delete on POST.
exports.surface_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: surface delete POST");
};

// Display surface update form on GET.
exports.surface_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: surface update GET");
};

// Handle surface update on POST.
exports.surface_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: surface update POST");
};
