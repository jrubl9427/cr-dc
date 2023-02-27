// lzController.js

const Lz = require("../models/lz");
const async = require("async");

// Display a list of all lzs.
exports.lz_list = (req, res, next) => {
    Lz.find({})
        .sort({ distanceToGreen: -1 })
        .exec(function (err, list_lzs) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("lz_list", {
                    title: "Lz List",
                    lz_list: list_lzs
                });
            }
        });
};

// Display detail page for a specific lz.
exports.lz_detail = (req, res, next) => {
    async.parallel(
        {
            lz(callback) {
                Lz.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.lz == null) {
                // No, results
                const err = new Error("Lz not found");
                err.status = 404;
                return next(err);
            }
            res.render("lz_detail", {
                title: results.lz.name,
                lz: results.lz
            });
        }
    );
};

// Display lz create form on GET.
exports.lz_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lz create GET");
};

// Handle lz create on POST.
exports.lz_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lz create POST");
};

// Display lz delete form on GET.
exports.lz_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lz delete GET");
};

// Handle lz delete on POST.
exports.lz_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lz delete POST");
};

// Display lz update form on GET.
exports.lz_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lz update GET");
};

// Handle lz update on POST.
exports.lz_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lz update POST");
};
