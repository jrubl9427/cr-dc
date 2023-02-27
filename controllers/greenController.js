// greenController.js

const Green = require("../models/green");
const async = require("async");

// Display a list of all greens.
exports.green_list = (req, res, next) => {
    Green.find({})
        .sort({ name: 1 })
        .exec(function (err, list_greens) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("green_list", {
                    title: "Green List",
                    green_list: list_greens
                });
            }
        });
};

// Display detail page for a specific green.
exports.green_detail = (req, res, next) => {
    async.parallel(
        {
            green(callback) {
                Green.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.green == null) {
                // No, results
                const err = new Error("Green not found");
                err.status = 404;
                return next(err);
            }
            res.render("green_detail", {
                title: results.green.name,
                green: results.green
            });
        }
    );
};

// Display green create form on GET.
exports.green_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: green create GET");
};

// Handle green create on POST.
exports.green_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: green create POST");
};

// Display green delete form on GET.
exports.green_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: green delete GET");
};

// Handle green delete on POST.
exports.green_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: green delete POST");
};

// Display green update form on GET.
exports.green_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: green update GET");
};

// Handle green update on POST.
exports.green_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: green update POST");
};
