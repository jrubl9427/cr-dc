// doglegController.js

const async = require("async");
const Dogleg = require("../models/dogleg");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all doglegs.
exports.dogleg_list = (req, res, next) => {
    Dogleg.find({})
        .exec(function (err, list_doglegs) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("dogleg_list", {
                title: "Dogleg List",
                dogleg_list: list_doglegs
            });
        })
};

// Display detail page for a specific dogleg.
exports.dogleg_detail = (req, res, next) => {
    async.parallel(
        {
            dogleg(callback) {
                Dogleg.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({dogleg: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.dogleg == null) {
                // No, results
                const err = new Error("Dogleg not found");
                err.status = 404;
                return next(err);
            }
            res.render("dogleg_detail", {
                title: results.dogleg.name,
                dogleg: results.dogleg,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display dogleg create form on GET.
exports.dogleg_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg create GET");
};

// Handle dogleg create on POST.
exports.dogleg_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg create POST");
};

// Display dogleg delete form on GET.
exports.dogleg_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg delete GET");
};

// Handle dogleg delete on POST.
exports.dogleg_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg delete POST");
};

// Display dogleg update form on GET.
exports.dogleg_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg update GET");
};

// Handle dogleg update on POST.
exports.dogleg_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg update POST");
};
