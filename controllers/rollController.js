// rollController.js

const Roll = require("../models/roll");

// Display a list of all rolls.
exports.roll_list = (req, res) => {
    res.send("NOT IMPLEMENTED: roll list");
};

// Display detail page for a specific roll.
exports.roll_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: roll detail: ${req.params.id}`);
};

// Display roll create form on GET.
exports.roll_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: roll create GET");
};

// Handle roll create on POST.
exports.roll_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: roll create POST");
};

// Display roll delete form on GET.
exports.roll_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: roll delete GET");
};

// Handle roll delete on POST.
exports.roll_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: roll delete POST");
};

// Display roll update form on GET.
exports.roll_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: roll update GET");
};

// Handle roll update on POST.
exports.roll_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: roll update POST");
};
