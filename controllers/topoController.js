// topoController.js

const Topo = require("../models/topo");

// Display a list of all topos.
exports.topo_list = (req, res) => {
    res.send("NOT IMPLEMENTED: topo list");
};

// Display detail page for a specific topo.
exports.topo_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: topo detail: ${req.params.id}`);
};

// Display topo create form on GET.
exports.topo_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: topo create GET");
};

// Handle topo create on POST.
exports.topo_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: topo create POST");
};

// Display topo delete form on GET.
exports.topo_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: topo delete GET");
};

// Handle topo delete on POST.
exports.topo_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: topo delete POST");
};

// Display topo update form on GET.
exports.topo_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: topo update GET");
};

// Handle topo update on POST.
exports.topo_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: topo update POST");
};
