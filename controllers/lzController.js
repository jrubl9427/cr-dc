// lzController.js

const Lz = require("../models/lz");

// Display a list of all lzs.
exports.lz_list = (req, res) => {
    res.send("NOT IMPLEMENTED: lz list");
};

// Display detail page for a specific lz.
exports.lz_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: lz detail: ${req.params.id}`);
};

// Display lz create form on GET.
exports.lz_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lz create GET");
};

// Handle lz create on POST.
exports.lz_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lz create POST");
};

// Display lz delete form on GET.
exports.lz_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lz delete GET");
};

// Handle lz delete on POST.
exports.lz_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lz delete POST");
};

// Display lz update form on GET.
exports.lz_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: lz update GET");
};

// Handle lz update on POST.
exports.lz_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: lz update POST");
};
