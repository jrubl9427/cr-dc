// crossingController.js

const async = require("async");
const Crossing = require("../models/crossing");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all crossings.
exports.crossing_list = (req, res, next) => {
    Crossing.find({})
        .exec(function (err, list_crossings) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("crossing_list", {
                title: "Crossing List",
                crossing_list: list_crossings
            });
        })
};

// Display detail page for a specific crossing.
exports.crossing_detail = (req, res, next) => {
    async.parallel(
        {
            crossing(callback) {
                Crossing.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({crossing: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.crossing == null) {
                // No, results
                const err = new Error("Crossing not found");
                err.status = 404;
                return next(err);
            }
            res.render("crossing_detail", {
                title: results.crossing.name,
                crossing: results.crossing,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display crossing create form on GET.
exports.crossing_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing create GET");
};

// Handle crossing create on POST.
exports.crossing_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing create POST");
};

// Display crossing delete form on GET.
exports.crossing_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing delete GET");
};

// Handle crossing delete on POST.
exports.crossing_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing delete POST");
};

// Display crossing update form on GET.
exports.crossing_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing update GET");
};

// Handle crossing update on POST.
exports.crossing_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing update POST");
};
