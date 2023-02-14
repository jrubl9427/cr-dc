// targetController.js

const Target = require("../models/target");

// Display a list of all targets.
exports.target_list = (req, res) => {
    res.send("NOT IMPLEMENTED: target list");
};

// Display detail page for a specific target.
exports.target_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: target detail: ${req.params.id}`);
};

// Display target create form on GET.
exports.target_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: target create GET");
};

// Handle target create on POST.
exports.target_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: target create POST");
};

// Display target delete form on GET.
exports.target_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: target delete GET");
};

// Handle target delete on POST.
exports.target_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: target delete POST");
};

// Display target update form on GET.
exports.target_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: target update GET");
};

// Handle target update on POST.
exports.target_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: target update POST");
};
