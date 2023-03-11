// topoConttopoer.js

const async = require("async");
const Topo = require("../models/topo");
const LzObstacle = require("../models/lzObstacle");
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
            lzObstacle(callback) {
                LzObstacle.find({topo: req.params.id})
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
                lzObstacle: results.lzObstacle,
            });
        }
    )
};

// Display topo create form on GET.
exports.topo_create_get = (req, res, next) => {
    res.render("topo_form", {
        title: "Create Topo",
    });
};

// Handle topo create on POST.
exports.topo_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a topo object with escaped and trimmed data.
        const topo = new Topo({
            name: req.body.name + " topo",
            rating: req.body.rating,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("topo_form", {
                title: "Create topo",
                topo,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save topo.
        topo.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new topo record.
            res.redirect(topo.url);
        });
    },
];;

// Display topo delete form on GET.
exports.topo_delete_get = (req, res, next) => {
    async.parallel(
        {
            topo: function (callback) {
                Topo.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.topo == null) {
                // No results
                res.redirect("/catalog/topos");
            }
            // Sucessful, so render
            res.render("topo_delete", {
                title: "Delete Topo",
                topo: results.topo
            });
        }
    );
};

// Handle topo delete on POST.
exports.topo_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Topo.findByIdAndRemove(req.body.topoid, function deletetopo(err) {
        if (err) {
            return next(err);
        }
        // Success - go to topos list.
        res.redirect("/catalog/topos");
    });
};

// Display topo update form on GET.
exports.topo_update_get = (req, res, next) => {
    // get the topo and lzObstacles for the form.
    async.parallel(
        {
            topo(callback) {
                Topo.findById(req.params.id)
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
            res.render("topo_form", {
                title: "Update Topo",
                topo: results.topo,
            });
        }
    );
};

// Handle topo update on POST.
exports.topo_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a topo object with escaped and trimmed data.
        const topo = new Topo({
            name: req.body.name,
            rating: req.body.rating,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("topo_form", {
                title: "Update Topo",
                topo,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Topo.findByIdAndUpdate(req.params.id, topo, {runValidators: true}, (err, thetopo) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to topo detail page.
            res.redirect(thetopo.url);
        });
    },
]
