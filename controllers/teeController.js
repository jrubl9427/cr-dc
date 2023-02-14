// teeController.js

const Tee = require("../models/tee");

// Display a list of all tees.
exports.tee_list = (req, res) => {
    res.send("NOT IMPLEMENTED: tee list");
};

// Display detail page for a specific tee.
exports.tee_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: tee detail: ${req.params.id}`);
};

// Display tee create form on GET.
exports.tee_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: tee create GET");
};

// Handle tee create on POST.
exports.tee_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: tee create POST");
};

// Display tee delete form on GET.
exports.tee_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: tee delete GET");
};

// Handle tee delete on POST.
exports.tee_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: tee delete POST");
};

// Display tee update form on GET.
exports.tee_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: tee update GET");
};

// Handle tee update on POST.
exports.tee_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: tee update POST");
};
