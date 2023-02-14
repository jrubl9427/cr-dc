// fairwayController.js

const Fairway = require("../models/fairway");

// Display a list of all fairways.
exports.fairway_list = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway list");
};

// Display detail page for a specific fairway.
exports.fairway_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: fairway detail: ${req.params.id}`);
};

// Display fairway create form on GET.
exports.fairway_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway create GET");
};

// Handle fairway create on POST.
exports.fairway_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway create POST");
};

// Display fairway delete form on GET.
exports.fairway_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway delete GET");
};

// Handle fairway delete on POST.
exports.fairway_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway delete POST");
};

// Display fairway update form on GET.
exports.fairway_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway update GET");
};

// Handle fairway update on POST.
exports.fairway_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: fairway update POST");
};
