// greenController.js

const Green = require("../models/green");

// Display a list of all greens.
exports.green_list = (req, res) => {
    res.send("NOT IMPLEMENTED: green list");
};

// Display detail page for a specific green.
exports.green_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: green detail: ${req.params.id}`);
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
