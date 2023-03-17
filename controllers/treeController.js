// treeController.js

const async = require("async");
const Tree = require("../models/tree");
const LzObstacle = require("../models/lzObstacle");
const TeeObstacle = require("../models/teeObstacle");
const GreenObstacle = require("../models/greenObstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all trees.
exports.tree_list = (req, res, next) => {
    Tree.find({})
        .sort({ name: 1 })
        .exec(function (err, list_trees) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("tree_list", {
                title: "Tree List",
                tree_list: list_trees
            });
        })
};

// Display detail page for a specific tree.
exports.tree_detail = (req, res, next) => {
    async.parallel(
        {
            tree(callback) {
                Tree.findById(req.params.id)
                    .exec(callback);
            },
            lzObstacle(callback) {
                LzObstacle.find({tree: req.params.id})
                    .exec(callback);
            },
            teeObstacle(callback) {
                TeeObstacle.find({tree: req.params.id})
                    .exec(callback);
            },
            greenObstacle(callback) {
                GreenObstacle.find({tree: req.params.id})
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.tree == null) {
                // No, results
                const err = new Error("Tree not found");
                err.status = 404;
                return next(err);
            }
            res.render("tree_detail", {
                title: results.tree.name,
                tree: results.tree,
                lzObstacle: results.lzObstacle,
                teeObstacle: results.teeObstacle,
                greenObstacle: results.greenObstacle
            });
        }
    )
};

// Display tree create form on GET.
exports.tree_create_get = (req, res, next) => {
    res.render("tree_form", {
        title: "Create Tree",
    });
};

// Handle tree create on POST.
exports.tree_create_post = [
    
    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("obstructed_O", "Obstructed_O must be integer.").trim().isInt().escape(),
    body("chute_H", "Chute_H must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a tree object with escaped and trimmed data.
        const tree = new Tree({
            name: req.body.name + " tree",
            rating: req.body.rating,
            obstructed_O: req.body.obstructed_O,
            chute_H: req.body.chute_H,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. 
            
            res.render("tree_form", {
                title: "Create Tree",
                tree,
                errors: errors.array(),
            });
            return;
        }

        // Data from form is valid. Save tree.
        tree.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new tree record.
            res.redirect(tree.url);
        });
    },
];;

// Display tree delete form on GET.
exports.tree_delete_get = (req, res, next) => {
    async.parallel(
        {
            tree: function (callback) {
                Tree.findById(req.params.id)
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.tree == null) {
                // No results
                res.redirect("/catalog/trees");
            }
            // Sucessful, so render
            res.render("tree_delete", {
                title: "Delete Tree",
                tree: results.tree
            });
        }
    );
};

// Handle tree delete on POST.
exports.tree_delete_post = (req, res, next) => {
    // Assume the post has valid id (ie no validation/sanitization).
    Tree.findByIdAndRemove(req.body.treeid, function deletetree(err) {
        if (err) {
            return next(err);
        }
        // Success - go to trees list.
        res.redirect("/catalog/trees");
    });
};

// Display tree update form on GET.
exports.tree_update_get = (req, res, next) => {
    // get the tree and lzObstacles for the form.
    async.parallel(
        {
            tree(callback) {
                Tree.findById(req.params.id)
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.tree == null) {
                // No, results
                const err = new Error("tree not found");
                err.status = 404;
                return next(err);
            }
            res.render("tree_form", {
                title: "Update Tree",
                tree: results.tree,
            });
        }
    );
};

// Handle tree update on POST.
exports.tree_update_post = [

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("rating", "Rating must be integer.").trim().isInt().escape(),
    body("obstructed_O", "Obstructed_O must be integer.").trim().isInt().escape(),
    body("chute_H", "Chute_H must be integer.").trim().isInt().escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a tree object with escaped and trimmed data.
        const tree = new Tree({
            name: req.body.name,
            rating: req.body.rating,
            obstructed_O: req.body.obstructed_O,
            chute_H: req.body.chute_H,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages.
            res.render("tree_form", {
                title: "Update Tree",
                tree,
                errors: errors.array(),
            });
            return;
        }
        
        // Data from form is valid. Update the record.
        Tree.findByIdAndUpdate(req.params.id, tree, {runValidators: true}, (err, thetree) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to tree detail page.
            res.redirect(thetree.url);
        });
    },
]

