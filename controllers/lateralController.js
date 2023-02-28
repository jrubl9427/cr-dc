// lateralController.js

const async = require("async");
const Lateral = require("../models/lateral");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all laterals.
exports.lateral_list = (req, res, next) => {
    Lateral.find({})
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
            obstacle(callback) {
                Obstacle.find({lateral: req.params.id})
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
                obstacle: results.obstacle,
            });
        }
    )
};

// Display lateral create form on GET.
exports.lateral_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral create GET");
};

// Handle lateral create on POST.
exports.lateral_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral create POST");
};

// Display lateral delete form on GET.
exports.lateral_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral delete GET");
};

// Handle lateral delete on POST.
exports.lateral_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral delete POST");
};

// Display lateral update form on GET.
exports.lateral_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral update GET");
};

// Handle lateral update on POST.
exports.lateral_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral update POST");
};
