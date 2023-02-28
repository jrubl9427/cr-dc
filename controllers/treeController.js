// treeController.js

const async = require("async");
const Tree = require("../models/tree");
const Obstacle = require("../models/obstacle");
const { body, validationResult } = require("express-validator");

// Display a list of all trees.
exports.tree_list = (req, res, next) => {
    Tree.find({})
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
            obstacle(callback) {
                Obstacle.find({tree: req.params.id})
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
                obstacle: results.obstacle,
            });
        }
    )
};

// Display tree create form on GET.
exports.tree_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: tree create GET");
};

// Handle tree create on POST.
exports.tree_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: tree create POST");
};

// Display tree delete form on GET.
exports.tree_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: tree delete GET");
};

// Handle tree delete on POST.
exports.tree_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: tree delete POST");
};

// Display tree update form on GET.
exports.tree_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: tree update GET");
};

// Handle tree update on POST.
exports.tree_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: tree update POST");
};
