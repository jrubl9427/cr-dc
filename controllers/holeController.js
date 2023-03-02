// holeController.js

const Hole = require("../models/hole");
const Tee = require("../models/tee");
const Lz = require("../models/lz");
const Green = require("../models/green");
const async = require("async");
const { body, validationResult } = require("express-validator");
const { ObjectID, ObjectId } = require("bson");

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
exports.hole_create_get = (req, res, next) => {
    // Get all tees, lzs and greens .
    async.parallel(
        {
            tees(callback) {
                Tee.find(callback);
            },
            lzs(callback) {
                Lz.find(callback);
            },
            greens(callback) {
                Green.find(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render("hole_form", {
                title: "Create Hole",
                tees: results.tees,
                lzs: results.lzs,
                greens: results.greens,
            });
        }
    );
};

// Handle hole create on POST.
exports.hole_create_post = [
    // Convert tee and lz to arrays.
    (req, res, next) => {
        if (!Array.isArray(req.body.tee)) {
            req.body.tee = typeof req.body.tee === "undefined" ? [] : [req.body.tee];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.lz)) {
            req.body.lz = typeof req.body.lz === "undefined" ? [] : [req.body.lz];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must be an integer.").trim().isInt().escape(),
    body("tee.*").escape(),
    body("lz.*").escape(),
    body("green", "Green must not be empty.").trim().isLength({min: 1 }).escape(),

    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Hole object with escaped and trimmed data.
        const hole = new Hole({
            name: req.body.name,
            tee: req.body.tee,
            lz: req.body.lz,
            green: req.body.green,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all authors and genres for form.
            
            // Get all tees, lzs and greens for the form
            async.parallel(
                {
                    tees(callback) {
                        Tee.find(callback);
                    },
                },
                {
                    lzs(callback) {
                        Lz.find(callback);
                    },
                },
                {
                    greens(callback) {
                        Green.find(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }

                    // Mark selected tees as checked and render.
                    for (const tee of results.tees) {
                        if (hole.tee.includes(tee._id)) {
                            tee.checked = "true";
                        }
                    }
                    // Mark selected lzs as checked and render.
                    for (const lz of results.lzs) {
                        if (hole.lz.includes(lz._id)) {
                            lz.checked = "true";
                        }
                    }
                    // Mark selected greens as checked and render.
                    for (const green of results.greens) {
                        if (hole.green.includes(green._id)) {
                            green.checked = "true";
                        }
                    }
                    res.render("hole_form", {
                        title: "Create Hole",
                        tees: results.tees,
                        lzs: results.lzs,
                        greens: results.greens,
                        hole,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        // Data from form is valid. Save Hole.
        hole.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new course record.
            res.redirect(hole.url);
        });
    },
];

// Display hole delete form on GET.
exports.hole_delete_get = (req, res, next) => {
    async.parallel(
        {
            hole: function (callback) {
                Hole.findById(req.params.id)
                .populate("tee")
                .populate("lz")
                .populate("green")
                    .exec(callback);
            },
            // tees: function (callback) {
            //     Tee.find({}).exec(callback);
            // },
            // lzs: function (callback) {
            //     Lz.find({}).exec(callback);
            // },
            // greens: function (callback) {
            //     Green.find({}).exec(callback);
            // }
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.hole == null) {
                // No results
                res.redirect("/catalog/holes");
            }
            // Sucessful, so render
            res.render("hole_delete", {
                title: "Delete Hole",
                hole: results.hole,
                // tees: results.tees,
                // lzs: results.lzs,
                // greens: results.greens
            });
        }
    );
};

// Handle course delete on POST.
exports.hole_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    
    async.parallel(
        {
            hole: function (callback) {
                Hole.findById(req.body.id)
                    .populate("tee")
                    .populate("lz")
                    .populate("green")
                    .exec(callback);
            },
            // tees: function (callback) {
            //     Tee.find({ hole: req.params.id }).exec(callback);
            // },
            // lzs: function (callback) {
            //     Lz.find({ hole: req.params.id }).exec(callback);
            // },
            // greens: function (callback) {
            //     Green.find({ hole: req.params.id }).exec(callback);
            // }
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            Success
            if (results.hole.tee.length > 0 || results.hole.lz.length > 0 || results.hole.green != null) {
                res.render("hole_delete", {
                    title: "Delete Hole",
                    hole: results.hole,
                    // tees: results.tees,
                    // lzs: results.lzs,
                    // greens: results.greens
                });
                return;
            } else {
                // Hole has no Hole objects. Delete object and redirect to the list of holes.
                Hole.findByIdAndRemove(req.body.holeid, function deleteHole(err) {
                    if (err) {
                        return next(err);
                    }
                    // Success - go to holes list.
                    res.redirect("/catalog/holes");
                });
            }
        }
    );
};

// Display hole update form on GET.
exports.hole_update_get = (req, res, next) => {
    // get the hole and holes for the form.
    async.parallel(
        {
            hole(callback) {
                Hole.findById(req.params.id)
                    .populate("tee")
                    .populate("lz")
                    .populate("green")
                    .exec(callback);
            },
            tees(callback) {
                Tee.find(callback)
            },
            lzs(callback) {
                Lz.find(callback)
            },
            greens(callback) {
                Green.find(callback)
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
            // Successful, mark our selected tees as checked
            for (const tee of results.tees) {
                for (const aTee of results.hole.tee) {
                    if (tee._id.toString() === aTee._id.toString()) {
                        tee.checked = "true";
                    }
                }
            }
            for (const lz of results.lzs) {
                for (const aLz of results.hole.lz) {
                    if (lz._id.toString() === aLz._id.toString()) {
                        lz.checked = "true";
                    }
                }
            }
            res.render("hole_form", {
                title: "Update Hole",
                tees: results.tees,
                lzs: results.lzs,
                greens: results.greens,
                hole: results.hole,
            });
        }
    );
};

// Handle hole update on POST.
exports.hole_update_post = [
    // Convert tee and lz to arrays.
    (req, res, next) => {
        if (!Array.isArray(req.body.tee)) {
            req.body.tee = typeof req.body.tee === "undefined" ? [] : [req.body.tee];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.lz)) {
            req.body.lz = typeof req.body.lz === "undefined" ? [] : [req.body.lz];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must be an integer.").trim().isInt().escape(),
    body("tee.*").escape(),
    body("lz.*").escape(),
    body("green", "Green must not be empty.").trim().isLength({min: 1 }).escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Hole object with escaped and trimmed data.
        const hole = new Hole({
            name: req.body.name,
            tee: typeof req.body.tee === "undefined" ? [] : req.body.tee,
            lz: typeof req.body.lz === "undefined" ? [] : req.body.lz,
            green: req.body.green,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all authors and genres for form.
            
            // Get all tees, lzs and greens for the form
            async.parallel(
                {
                    tees(callback) {
                        Tee.find(callback);
                    },
                    lzs(callback) {
                        Lz.find(callback);
                    },
                    greens(callback) {
                        Green.find(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    res.render("hole_form", {
                        title: "Update Hole",
                        tees: results.tees,
                        lzs: results.lzs,
                        greens: results.greens,
                        hole,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        
        // Data from form is valid. Update the record.
        Hole.findByIdAndUpdate(req.params.id, hole, {}, (err, thehole) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to book detail page.
            res.redirect(thehole.url);
        });
    },
]
