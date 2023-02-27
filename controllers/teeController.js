// teeController.js

const Tee = require("../models/tee");
const async = require("async");


// Display a list of all tees.
exports.tee_list = (req, res, next) => {
    Tee.find({})
        .sort({ length: -1 })
        .exec(function (err, list_tees) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("tee_list", {
                    title: "Tee List",
                    tee_list: list_tees
                });
            }
        });
};

// Display detail page for a specific tee.
exports.tee_detail = (req, res, next) => {
    async.parallel(
        {
            tee(callback) {
                Tee.findById(req.params.id)
                    .populate("obstacle")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.tee == null) {
                // No, results
                const err = new Error("Tee not found");
                err.status = 404;
                return next(err);
            }
            res.render("tee_detail", {
                title: results.tee.name,
                tee: results.tee
            });
        }
    );
};

// Display tee create form on GET.
exports.tee_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: tee create GET");
};

// Handle tee create on POST.
exports.tee_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: tee create POST");
};

// Display tee delete form on GET.
exports.tee_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: tee delete GET");
};

// Handle tee delete on POST.
exports.tee_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: tee delete POST");
};

// Display tee update form on GET.
exports.tee_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: tee update GET");
};

// Handle tee update on POST.
exports.tee_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: tee update POST");
};
