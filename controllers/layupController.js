// layupController.js


const async = require("async");
const Layup = require("../models/layup");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all layups.
exports.layup_list = (req, res, next) => {
    Layup.find({})
        .populate("obstacle")
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
                title: results.layup._id,
                layup: results.layup,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display layup create form on GET.
exports.layup_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: layup create GET");
};

// Handle layup create on POST.
exports.layup_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: layup create POST");
};

// Display layup delete form on GET.
exports.layup_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: layup delete GET");
};

// Handle layup delete on POST.
exports.layup_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: layup delete POST");
};

// Display layup update form on GET.
exports.layup_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: layup update GET");
};

// Handle layup update on POST.
exports.layup_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: layup update POST");
};
