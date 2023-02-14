// surfaceController.js

const Surface = require("../models/surface");

// Display a list of all surfaces.
exports.surface_list = (req, res) => {
    res.send("NOT IMPLEMENTED: surface list");
};

// Display detail page for a specific surface.
exports.surface_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: surface detail: ${req.params.id}`);
};

// Display surface create form on GET.
exports.surface_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: surface create GET");
};

// Handle surface create on POST.
exports.surface_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: surface create POST");
};

// Display surface delete form on GET.
exports.surface_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: surface delete GET");
};

// Handle surface delete on POST.
exports.surface_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: surface delete POST");
};

// Display surface update form on GET.
exports.surface_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: surface update GET");
};

// Handle surface update on POST.
exports.surface_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: surface update POST");
};
