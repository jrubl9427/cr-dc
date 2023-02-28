// obstacleController.js

const Obstacle = require("../models/obstacle");
const async = require("async");

// Display a list of all obstacles.
exports.obstacle_list = (req, res, next) => {
    Obstacle.find({})
        .exec(function (err, list_obstacles) {
            if (err) {
                return next(err);
            } else {
                // Successful, so render
                res.render("obstacle_list", {
                    title: "Obstacle List",
                    obstacle_list: list_obstacles
                });
            }
        });
};

// Display detail page for a specific obstacle.
exports.obstacle_detail = (req, res, next) => {
    async.parallel(
        {
            obstacle(callback) {
                Obstacle.findById(req.params.id)
                .populate("layup")
                .populate("dogleg")
                .populate("roll")
                .populate("topo")
                .populate("fairway")
                .populate("target")
                .populate("rR")
                .populate("bunker")
                .populate("lateral")
                .populate("crossing")
                .populate("tree")
                .populate("surface")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.obstacle == null) {
                // No, results
                const err = new Error("Obstacle not found");
                err.status = 404;
                return next(err);
            }
            console.log("Results", results);
            res.render("obstacle_detail", {
                title: results.obstacle.name,
                obstacle: results.obstacle
            });
        }
    );
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
