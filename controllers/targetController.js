// targetController.js

const async = require("async");
const Target = require("../models/target");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all targets.
exports.target_list = (req, res, next) => {
    Target.find({})
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
            obstacle(callback) {
                Obstacle.find({target: req.params.id})
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
                obstacle: results.obstacle,
            });
        }
    )
};

// Display target create form on GET.
exports.target_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: target create GET");
};

// Handle target create on POST.
exports.target_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: target create POST");
};

// Display target delete form on GET.
exports.target_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: target delete GET");
};

// Handle target delete on POST.
exports.target_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: target delete POST");
};

// Display target update form on GET.
exports.target_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: target update GET");
};

// Handle target update on POST.
exports.target_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: target update POST");
};
