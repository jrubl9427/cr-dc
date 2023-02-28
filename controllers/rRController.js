// rRController.js

const async = require("async");
const RR = require("../models/rR");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all rRs.
exports.rR_list = (req, res, next) => {
    RR.find({})
        .exec(function (err, list_rRs) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("rR_list", {
                title: "RR List",
                rR_list: list_rRs
            });
        })
};

// Display detail page for a specific rR.
exports.rR_detail = (req, res, next) => {
    async.parallel(
        {
            rR(callback) {
                RR.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({rR: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.rR == null) {
                // No, results
                const err = new Error("RR not found");
                err.status = 404;
                return next(err);
            }
            res.render("rR_detail", {
                title: results.rR.name,
                rR: results.rR,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display rR create form on GET.
exports.rR_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: rR create GET");
};

// Handle rR create on POST.
exports.rR_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: rR create POST");
};

// Display rR delete form on GET.
exports.rR_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: rR delete GET");
};

// Handle rR delete on POST.
exports.rR_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: rR delete POST");
};

// Display rR update form on GET.
exports.rR_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: rR update GET");
};

// Handle rR update on POST.
exports.rR_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: rR update POST");
};
