// layupController.js

const Layup = require("../models/layup");

// Display a list of all layups.
exports.layup_list = (req, res) => {
    res.send("NOT IMPLEMENTED: layup list");
};

// Display detail page for a specific layup.
exports.layup_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: layup detail: ${req.params.id}`);
};

// Display layup create form on GET.
exports.layup_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: layup create GET");
};

// Handle layup create on POST.
exports.layup_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: layup create POST");
};

// Display layup delete form on GET.
exports.layup_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: layup delete GET");
};

// Handle layup delete on POST.
exports.layup_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: layup delete POST");
};

// Display layup update form on GET.
exports.layup_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: layup update GET");
};

// Handle layup update on POST.
exports.layup_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: layup update POST");
};
