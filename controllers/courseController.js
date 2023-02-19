// courseController.js

const async = require("async");
const Course = require("../models/course");
const Hole = require("../models/hole");
const Tee = require("../models/tee");
const Green = require("../models/green");
const RatingZone = require("../models/ratingZone");
const Obstacle = require("../models/obstacle");
const Layup = require("../models/layup");
const Dogleg = require("../models/dogleg");
const Roll = require("../models/roll");
const Topo = require("../models/topo");
const Fairway = require("../models/fairway");
const Target = require("../models/target");
const RR = require("../models/rR");
const Bunker = require("../models/bunker");
const Lateral = require("../models/lateral");
const Crossing = require("../models/crossing");
const Tree = require("../models/tree");
const Surface = require("../models/surface");
const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
    async.parallel(
        {
            course_count(callback) {
                Course.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
            },
            hole_count(callback) {
                Hole.countDocuments({}, callback);
            },
            tee_count(callback) {
                Tee.countDocuments({}, callback);
            },
            green_count(callback) {
                Green.countDocuments({}, callback);
            },
            ratingZone_count(callback) {
                RatingZone.countDocuments({}, callback);
            },
            obstacle_count(callback) {
                Obstacle.countDocuments({}, callback);
            },
            layup_count(callback) {
                Layup.countDocuments({}, callback);
            },
            dogleg_count(callback) {
                Dogleg.countDocuments({}, callback);
            },
            roll_count(callback) {
                Roll.countDocuments({}, callback);
            },
            topo_count(callback) {
                Topo.countDocuments({}, callback);
            },
            fairway_count(callback) {
                Fairway.countDocuments({}, callback);
            },
            target_count(callback) {
                Target.countDocuments({}, callback);
            },
            rR_count(callback) {
                RR.countDocuments({}, callback);
            },
            bunker_count(callback) {
                Bunker.countDocuments({}, callback);
            },
            lateral_count(callback) {
                Lateral.countDocuments({}, callback);
            },
            crossing_count(callback) {
                Crossing.countDocuments({}, callback);
            },
            tree_count(callback) {
                Tree.countDocuments({}, callback);
            },
            surface_count(callback) {
                Surface.countDocuments({}, callback);
            },
        },
        (err, results) => {
            res.render("index", {
                title: "Course Rating Data Collection Home",
                error: err,
                data: results,
            });
        }
    );
};

// Display a list of all courses.
exports.course_list = (req, res, next) => {
    Course.find({})
        .sort({name: 1 })
        .populate("hole")
        .exec(function (err, list_courses) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render("course_list", {
                title: "Course List",
                course_list: list_courses
            });
        })
};

// Display detail page for a specific course.
exports.course_detail = (req, res, next) => {
    async.parallel(
        {
            course(callback) {
                Course.findById(req.params.id)
                    .populate("hole")
                    .exec(callback);
            },
            hole(callback) {
                Hole.find({course: req.params.id})
                    .populate("green")
                    .populate("tee")
                    .exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            
            if (results.course == null) {
                // No, results
                const err = new Error("Course not found");
                err.status = 404;
                return next(err);
            }

            res.render("course_detail", {
                title: results.course.name,
                course: results.course,
                holes: results.hole,
            });
        }
    );
};

// Display course create form on GET.
exports.course_create_get = (req, res, next) => {
    // Get all holes .
    async.parallel(
        {
            holes(callback) {
                Hole.find(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.render("course_form", {
                title: "Create Course",
                holes: results.holes,
            });
        }
    );
};

// Handle course create on POST.
exports.course_create_post = [
    // Convert the hole to an array.
    (req, res, next) => {
        if (!Array.isArray(req.body.hole)) {
            req.body.hole = typeof req.body.hole === "undefined" ? [] : [req.body.hole];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("date", "Invalid date").optional({ checkFalsy: true }).isISO8601().toDate(),
    body("altitude", "Altitude must be integer.").trim().isInt().escape(),
    body("wind", "Wind must be integer.").trim().isInt().escape(),
    body("grassType", "Summary must not be empty.").escape(),
    body("greenSpeed", "Green Speed must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("roughHeight", "Rough Height must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("hole.*").escape(),

    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Course object with escaped and trimmed data.
        const course = new Course({
            name: req.body.name,
            date: req.body.date,
            altitude: req.body.altitude,
            wind: req.body.wind,
            grassType: req.body.grassType,
            greenSpeed: req.body.greenSpeed,
            roughHeight: req.body.roughHeight,
            hole: req.body.hole,
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all authors and genres for form.
            
            // Get all holes for the form
            async.parallel(
                {
                    holes(callback) {
                        Hole.find(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }

                    // Mark selected holes as checked and render.
                    for (const hole of results.holes) {
                        if (course.hole.includes(hole._id)) {
                            hole.checked = "true";
                        }
                    }
                    res.render("course_form", {
                        title: "Create Course",
                        holes: results.holes,
                        course,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }

        // Data from form is valid. Save Course.
        course.save((err) => {
            if (err) {
                return next(err);
            }
            // Successful save: redirect to new course record.
            res.redirect(course.url);
        });
    },
];

// Display course delete form on GET.
exports.course_delete_get = (req, res, next) => {
    async.parallel(
        {
            course: function (callback) {
                Course.findById(req.params.id).populate("hole").exec(callback);
            },
            holes: function (callback) {
                Hole.find({ course: req.params.id }).exec(callback);
            }
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.course == null) {
                // No results
                res.redirect("/catalog/courses");
            }
            // Sucessful, so render
            res.render("course_delete", {
                title: "Delete Course",
                course: results.course,
                holes: results.holes,
            });
        }
    );
};

// Handle course delete on POST.
exports.course_delete_post = (req, res, next) => {
    // Assume the poat has valid id (ie no validation/sanitization).
    
    async.parallel(
        {
            course: function (callback) {
                Course.findById(req.body.id).populate("hole").exec(callback);
            },
            holes: function (callback) {
                Hole.find({ course: req.params.id }).exec(callback);
            }
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            // Success
            if (results.holes.length > 0) {
                res.render("course_delete", {
                    title: "Delete Course",
                    course: results.course,
                    holes: results.holes,
                });
                return;
            } else {
                // Course has no Hole objects. Delete object and redirect to the list of courses.
                Course.findByIdAndRemove(req.body.courseid, function deleteCourse(err) {
                    if (err) {
                        return next(err);
                    }
                    // Success - go to courses list.
                    res.redirect("/catalog/coursess");
                });
            }
        }
    );
};

// Display course update form on GET.
exports.course_update_get = (req, res, next) => {
    // get the course and holes for the form.
    async.parallel(
        {
            course(callback) {
                Course.findById(req.params.id)
                    .populate("hole")
                    .exec(callback);
            },
            holes(callback) {
                Hole.find(callback)
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
                        
            if (results.course == null) {
                // No, results
                const err = new Error("Course not found");
                err.status = 404;
                return next(err);
            }
            // Successful, mark our selected holes as checked
            for (const hole of results.holes) {
                for (const aHole of results.course.hole) {
                    if (hole._id.toString() === aHole._id.toString()) {
                        hole.checked = "true";
                    }
                }
            }
            res.render("course_form", {
                title: "Update Course",
                holes: results.holes,
                course: results.course,
            });
        }
    );
};

// Handle course update on POST.
exports.course_update_post = [
    // Convert the hole to an array.
    (req, res, next) => {
        if (!Array.isArray(req.body.hole)) {
            req.body.hole = typeof req.body.hole === "undefined" ? [] : [req.body.hole];
        }
        next();
    },

    // Validate and sanitize the fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("date", "Invalid date").optional({ checkFalsy: true }).isISO8601().toDate(),
    body("altitude", "Altitude must be integer.").trim().isInt().escape(),
    body("wind", "Wind must be integer.").trim().isInt().escape(),
    body("grassType", "Summary must not be empty.").escape(),
    body("greenSpeed", "Green Speed must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("roughHeight", "Rough Height must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("hole.*").escape(),
    
    // Process request after validation and sanitation
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Course object with escaped and trimmed data.
        const course = new Course({
            name: req.body.name,
            date: req.body.date,
            altitude: req.body.altitude,
            wind: req.body.wind,
            grassType: req.body.grassType,
            greenSpeed: req.body.greenSpeed,
            roughHeight: req.body.roughHeight,
            hole: typeof req.body.hole === "undefined" ? [] : req.body.hole,
            _id: req.params.id, // This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            //There are errors. Render form again with sanitized values/error messages. Get all authors and genres for form.
            
            // Get all holes for the form
            async.parallel(
                {
                    holes(callback) {
                        Hole.find(callback);
                    },
                },
                (err, results) => {
                    if (err) {
                        return next(err);
                    }
                    res.render("course_form", {
                        title: "Update Course",
                        holes: results.holes,
                        course,
                        errors: errors.array(),
                    });
                }
            );
            return;
        }
        
        // Data from form is valid. Update the record.
        Course.findByIdAndUpdate(req.params.id, course, {}, (err, thecourse) => {
            if (err) {
                return next(err);
            }
            
            // Successful: redirect to book detail page.
            res.redirect(thecourse.url);
        });
    },
]
