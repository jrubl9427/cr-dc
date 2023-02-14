// bunkerController.js

const Bunker = require("../models/bunker");

// Display a list of all bunkers.
exports.bunker_list = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker list");
};

// Display detail page for a specific Bunker.
exports.bunker_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: Bunker detail: ${req.params.id}`);
};

// Display Bunker create form on GET.
exports.bunker_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker create GET");
};

// Handle Bunker create on POST.
exports.bunker_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker create POST");
};

// Display Bunker delete form on GET.
exports.bunker_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker delete GET");
};

// Handle Bunker delete on POST.
exports.bunker_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker delete POST");
};

// Display Bunker update form on GET.
exports.bunker_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker update GET");
};

// Handle Bunker update on POST.
exports.bunker_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Bunker update POST");
};
