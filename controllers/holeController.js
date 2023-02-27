// holeController.js

const Hole = require("../models/hole");
const async = require("async");

// Display a list of all holes.
exports.hole_list = (req, res, next) => {
    Hole.find({})
        .sort({ name: 1 })
        // .populate("course")
        .exec(function (err, list_holes) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("hole_list", {
                    title: "Hole List",
                    hole_list: list_holes
                });
            }
        });
};

// Display detail page for a specific hole.
exports.hole_detail = (req, res, next) => {
    async.parallel(
        {
            hole(callback) {
                Hole.findById(req.params.id)
                    .populate("green")
                    .populate("tee")
                    .populate("lz")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.hole == null) {
                // No, results
                const err = new Error("Hole not found");
                err.status = 404;
                return next(err);
            }
            res.render("hole_detail", {
                title: results.hole.name,
                hole: results.hole
            });
        }
    );
};

// Display hole create form on GET.
exports.hole_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: hole create GET");
};

// Handle hole create on POST.
exports.hole_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: hole create POST");
};

// Display hole delete form on GET.
exports.hole_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: hole delete GET");
};

// Handle hole delete on POST.
exports.hole_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: hole delete POST");
};

// Display hole update form on GET.
exports.hole_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: hole update GET");
};

// Handle hole update on POST.
exports.hole_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: hole update POST");
};
