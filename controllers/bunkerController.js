// bunkerController.js

const async = require("async");
const Bunker = require("../models/bunker");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all bunkers.
exports.bunker_list = (req, res, next) => {
    Bunker.find({})
        .exec(function (err, list_bunkers) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("bunker_list", {
                title: "Bunker List",
                bunker_list: list_bunkers
            });
        })
};

// Display detail page for a specific bunker.
exports.bunker_detail = (req, res, next) => {
    async.parallel(
        {
            bunker(callback) {
                Bunker.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({bunker: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.bunker == null) {
                // No, results
                const err = new Error("Bunker not found");
                err.status = 404;
                return next(err);
            }
            res.render("bunker_detail", {
                title: results.bunker.name,
                bunker: results.bunker,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display Bunker create form on GET.
exports.bunker_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker create GET");
};

// Handle Bunker create on POST.
exports.bunker_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker create POST");
};

// Display Bunker delete form on GET.
exports.bunker_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker delete GET");
};

// Handle Bunker delete on POST.
exports.bunker_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker delete POST");
};

// Display Bunker update form on GET.
exports.bunker_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker update GET");
};

// Handle Bunker update on POST.
exports.bunker_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker update POST");
};
