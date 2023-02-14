// treeController.js

const Tree = require("../models/tree");

// Display a list of all trees.
exports.tree_list = (req, res) => {
    res.send("NOT IMPLEMENTED: tree list");
};

// Display detail page for a specific tree.
exports.tree_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: tree detail: ${req.params.id}`);
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
