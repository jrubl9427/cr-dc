// crossingController.js

const Crossing = require("../models/crossing");

// Display a list of all crossings.
exports.crossing_list = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing list");
};

// Display detail page for a specific crossing.
exports.crossing_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: crossing detail: ${req.params.id}`);
};

// Display crossing create form on GET.
exports.crossing_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing create GET");
};

// Handle crossing create on POST.
exports.crossing_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing create POST");
};

// Display crossing delete form on GET.
exports.crossing_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing delete GET");
};

// Handle crossing delete on POST.
exports.crossing_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing delete POST");
};

// Display crossing update form on GET.
exports.crossing_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing update GET");
};

// Handle crossing update on POST.
exports.crossing_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: crossing update POST");
};
