// topoController.js

const async = require("async");
const Topo = require("../models/topo");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all topos.
exports.topo_list = (req, res, next) => {
    Topo.find({})
        .exec(function (err, list_topos) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("topo_list", {
                title: "Topo List",
                topo_list: list_topos
            });
        })
};

// Display detail page for a specific topo.
exports.topo_detail = (req, res, next) => {
    async.parallel(
        {
            topo(callback) {
                Topo.findById(req.params.id)
                    .exec(callback);
            },
            obstacle(callback) {
                Obstacle.find({topo: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.topo == null) {
                // No, results
                const err = new Error("Topo not found");
                err.status = 404;
                return next(err);
            }
            res.render("topo_detail", {
                title: results.topo.name,
                topo: results.topo,
                obstacle: results.obstacle,
            });
        }
    )
};

// Display topo create form on GET.
exports.topo_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: topo create GET");
};

// Handle topo create on POST.
exports.topo_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: topo create POST");
};

// Display topo delete form on GET.
exports.topo_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: topo delete GET");
};

// Handle topo delete on POST.
exports.topo_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: topo delete POST");
};

// Display topo update form on GET.
exports.topo_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: topo update GET");
};

// Handle topo update on POST.
exports.topo_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: topo update POST");
};
