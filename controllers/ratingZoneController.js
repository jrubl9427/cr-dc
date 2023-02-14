// ratingZoneController.js

const RatingZone = require("../models/ratingZone");

// Display a list of all ratingZones.
exports.ratingZone_list = (req, res) => {
    res.send("NOT IMPLEMENTED: ratingZone list");
};

// Display detail page for a specific ratingZone.
exports.ratingZone_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: ratingZone detail: ${req.params.id}`);
};

// Display ratingZone create form on GET.
exports.ratingZone_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: ratingZone create GET");
};

// Handle ratingZone create on POST.
exports.ratingZone_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: ratingZone create POST");
};

// Display ratingZone delete form on GET.
exports.ratingZone_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: ratingZone delete GET");
};

// Handle ratingZone delete on POST.
exports.ratingZone_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: ratingZone delete POST");
};

// Display ratingZone update form on GET.
exports.ratingZone_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: ratingZone update GET");
};

// Handle ratingZone update on POST.
exports.ratingZone_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: ratingZone update POST");
};
