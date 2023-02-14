// doglegController.js

const Dogleg = require("../models/dogleg");

// Display a list of all doglegs.
exports.dogleg_list = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg list");
};

// Display detail page for a specific dogleg.
exports.dogleg_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: dogleg detail: ${req.params.id}`);
};

// Display dogleg create form on GET.
exports.dogleg_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg create GET");
};

// Handle dogleg create on POST.
exports.dogleg_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg create POST");
};

// Display dogleg delete form on GET.
exports.dogleg_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg delete GET");
};

// Handle dogleg delete on POST.
exports.dogleg_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg delete POST");
};

// Display dogleg update form on GET.
exports.dogleg_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg update GET");
};

// Handle dogleg update on POST.
exports.dogleg_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: dogleg update POST");
};
