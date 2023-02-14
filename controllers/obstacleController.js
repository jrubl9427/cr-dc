// obstacleController.js

const Obstacle = require("../models/obstacle");

// Display a list of all obstacles.
exports.obstacle_list = (req, res) => {
    res.send("NOT IMPLEMENTED: obstacle list");
};

// Display detail page for a specific obstacle.
exports.obstacle_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: obstacle detail: ${req.params.id}`);
};

// Display obstacle create form on GET.
exports.obstacle_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: obstacle create GET");
};

// Handle obstacle create on POST.
exports.obstacle_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: obstacle create POST");
};

// Display obstacle delete form on GET.
exports.obstacle_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: obstacle delete GET");
};

// Handle obstacle delete on POST.
exports.obstacle_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: obstacle delete POST");
};

// Display obstacle update form on GET.
exports.obstacle_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: obstacle update GET");
};

// Handle obstacle update on POST.
exports.obstacle_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: obstacle update POST");
};
