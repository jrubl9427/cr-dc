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
exports.roll_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: roll create GET");
};

// Handle roll create on POST.
exports.roll_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: roll create POST");
};

// Display roll delete form on GET.
exports.roll_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: roll delete GET");
};

// Handle roll delete on POST.
exports.roll_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: roll delete POST");
};

// Display roll update form on GET.
exports.roll_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: roll update GET");
};

// Handle roll update on POST.
exports.roll_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: roll update POST");
};
