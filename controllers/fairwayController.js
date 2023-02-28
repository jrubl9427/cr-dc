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
exports.fairway_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway create GET");
};

// Handle fairway create on POST.
exports.fairway_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway create POST");
};

// Display fairway delete form on GET.
exports.fairway_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway delete GET");
};

// Handle fairway delete on POST.
exports.fairway_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway delete POST");
};

// Display fairway update form on GET.
exports.fairway_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway update GET");
};

// Handle fairway update on POST.
exports.fairway_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway update POST");
};
