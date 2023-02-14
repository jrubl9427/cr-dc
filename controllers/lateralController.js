// lateralController.js

const Lateral = require("../models/lateral");

// Display a list of all laterals.
exports.lateral_list = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral list");
};

// Display detail page for a specific lateral.
exports.lateral_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: lateral detail: ${req.params.id}`);
};

// Display lateral create form on GET.
exports.lateral_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral create GET");
};

// Handle lateral create on POST.
exports.lateral_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral create POST");
};

// Display lateral delete form on GET.
exports.lateral_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral delete GET");
};

// Handle lateral delete on POST.
exports.lateral_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral delete POST");
};

// Display lateral update form on GET.
exports.lateral_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral update GET");
};

// Handle lateral update on POST.
exports.lateral_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lateral update POST");
};
