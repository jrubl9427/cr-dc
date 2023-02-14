var express = require('express');
var router = express.Router();

// Require controller modules
const bunker_controller = require("../controllers/bunkerController");
const course_controller = require("../controllers/courseController");
const crossing_controller = require("../controllers/crossingController");
const dogleg_controller = require("../controllers/doglegController");
const fairway_controller = require("../controllers/fairwayController");
const green_controller = require("../controllers/greenController");
const hole_controller = require("../controllers/holeController");
const lateral_controller = require("../controllers/lateralController");
const layup_controller = require("../controllers/layupController");
const obstacle_controller = require("../controllers/obstacleController");
const ratingZone_controller = require("../controllers/ratingZoneController");
const roll_controller = require("../controllers/rollController");
const rR_controller = require("../controllers/rRController");
const surface_controller = require("../controllers/surfaceController");
const target_controller = require("../controllers/targetController");
const tee_controller = require("../controllers/teeController");
const topo_controller = require("../controllers/topoController");
const tree_controller = require("../controllers/treeController");

/// BUNKER ROUTES ///

// GET request for creating Bunker. NOTE This must come before route for id (i.e. display bunker).
router.get("/bunker/create", bunker_controller.bunker_create_get);

// POST request for creating bunker.
router.post("/bunker/create", bunker_controller.bunker_create_post);

// GET request to delete bunker.
router.get("/bunker/:id/delete", bunker_controller.bunker_delete_get);

// POST request to delete bunker.
router.post("/bunker/:id/delete", bunker_controller.bunker_delete_post);

// GET request to update bunker.
router.get("/bunker/:id/update", bunker_controller.bunker_update_get);

// POST request to update bunker.
router.post("/bunker/:id/update", bunker_controller.bunker_update_post);

// GET request for one bunker.
router.get("/bunker/:id", bunker_controller.bunker_detail);

// GET request for list of all bunkers.
router.get("/bunkers", bunker_controller.bunker_list);

/// COURSE ROUTES ///

// GET catalog home page.
router.get("/", course_controller.index); //This actually maps to /catalog/ because we import the route with a /catalog prefix

// GET request for creating Course. NOTE This must come before route for id (i.e. display bunker).
router.get("/course/create", course_controller.course_create_get);

// POST request for creating course.
router.post("/course/create", course_controller.course_create_post);

// GET request to delete course.
router.get("/course/:id/delete", course_controller.course_delete_get);

// POST request to delete course.
router.post("/course/:id/delete", course_controller.course_delete_post);

// GET request to update course.
router.get("/course/:id/update", course_controller.course_update_get);

// POST request to update course.
router.post("/course/:id/update", course_controller.course_update_post);

// GET request for one course.
router.get("/course/:id", course_controller.course_detail);

// GET request for list of all courses.
router.get("/courses", course_controller.course_list);

/// CROSSING ROUTES ///

// GET request for creating Crossing. NOTE This must come before route for id (i.e. display bunker).
router.get("/crossing/create", crossing_controller.crossing_create_get);

// POST request for creating crossing.
router.post("/crossing/create", crossing_controller.crossing_create_post);

// GET request to delete crossing.
router.get("/crossing/:id/delete", crossing_controller.crossing_delete_get);

// POST request to delete crossing.
router.post("/crossing/:id/delete", crossing_controller.crossing_delete_post);

// GET request to update crossing.
router.get("/crossing/:id/update", crossing_controller.crossing_update_get);

// POST request to update crossing.
router.post("/crossing/:id/update", crossing_controller.crossing_update_post);

// GET request for one crossing.
router.get("/crossing/:id", crossing_controller.crossing_detail);

// GET request for list of all crossings.
router.get("/crossings", crossing_controller.crossing_list);

/// DOGLEG ROUTES ///

// GET request for creating Dogleg. NOTE This must come before route for id (i.e. display bunker).
router.get("/dogleg/create", dogleg_controller.dogleg_create_get);

// POST request for creating dogleg.
router.post("/dogleg/create", dogleg_controller.dogleg_create_post);

// GET request to delete dogleg.
router.get("/dogleg/:id/delete", dogleg_controller.dogleg_delete_get);

// POST request to delete dogleg.
router.post("/dogleg/:id/delete", dogleg_controller.dogleg_delete_post);

// GET request to update dogleg.
router.get("/dogleg/:id/update", dogleg_controller.dogleg_update_get);

// POST request to update dogleg.
router.post("/dogleg/:id/update", dogleg_controller.dogleg_update_post);

// GET request for one dogleg.
router.get("/dogleg/:id", dogleg_controller.dogleg_detail);

// GET request for list of all doglegs.
router.get("/doglegs", dogleg_controller.dogleg_list);

/// FAIRWAY ROUTES ///

// GET request for creating Fairway. NOTE This must come before route for id (i.e. display bunker).
router.get("/fairway/create", fairway_controller.fairway_create_get);

// POST request for creating fairway.
router.post("/fairway/create", fairway_controller.fairway_create_post);

// GET request to delete fairway.
router.get("/fairway/:id/delete", fairway_controller.fairway_delete_get);

// POST request to delete fairway.
router.post("/fairway/:id/delete", fairway_controller.fairway_delete_post);

// GET request to update fairway.
router.get("/fairway/:id/update", fairway_controller.fairway_update_get);

// POST request to update fairway.
router.post("/fairway/:id/update", fairway_controller.fairway_update_post);

// GET request for one fairway.
router.get("/fairway/:id", fairway_controller.fairway_detail);

// GET request for list of all fairways.
router.get("/fairways", fairway_controller.fairway_list);

/// GREEN ROUTES ///

// GET request for creating Green. NOTE This must come before route for id (i.e. display bunker).
router.get("/green/create", green_controller.green_create_get);

// POST request for creating green.
router.post("/green/create", green_controller.green_create_post);

// GET request to delete green.
router.get("/green/:id/delete", green_controller.green_delete_get);

// POST request to delete green.
router.post("/green/:id/delete", green_controller.green_delete_post);

// GET request to update green.
router.get("/green/:id/update", green_controller.green_update_get);

// POST request to update green.
router.post("/green/:id/update", green_controller.green_update_post);

// GET request for one green.
router.get("/green/:id", green_controller.green_detail);

// GET request for list of all greens.
router.get("/greens", green_controller.green_list);

/// HOLE ROUTES ///

// GET request for creating Hole. NOTE This must come before route for id (i.e. display bunker).
router.get("/hole/create", hole_controller.hole_create_get);

// POST request for creating hole.
router.post("/hole/create", hole_controller.hole_create_post);

// GET request to delete hole.
router.get("/hole/:id/delete", hole_controller.hole_delete_get);

// POST request to delete hole.
router.post("/hole/:id/delete", hole_controller.hole_delete_post);

// GET request to update hole.
router.get("/hole/:id/update", hole_controller.hole_update_get);

// POST request to update hole.
router.post("/hole/:id/update", hole_controller.hole_update_post);

// GET request for one hole.
router.get("/hole/:id", hole_controller.hole_detail);

// GET request for list of all holes.
router.get("/holes", hole_controller.hole_list);

/// LATERAL ROUTES ///

// GET request for creating Lateral. NOTE This must come before route for id (i.e. display bunker).
router.get("/lateral/create", lateral_controller.lateral_create_get);

// POST request for creating lateral.
router.post("/lateral/create", lateral_controller.lateral_create_post);

// GET request to delete lateral.
router.get("/lateral/:id/delete", lateral_controller.lateral_delete_get);

// POST request to delete lateral.
router.post("/lateral/:id/delete", lateral_controller.lateral_delete_post);

// GET request to update lateral.
router.get("/lateral/:id/update", lateral_controller.lateral_update_get);

// POST request to update lateral.
router.post("/lateral/:id/update", lateral_controller.lateral_update_post);

// GET request for one lateral.
router.get("/lateral/:id", lateral_controller.lateral_detail);

// GET request for list of all laterals.
router.get("/laterals", lateral_controller.lateral_list);

/// LAYUP ROUTES ///

// GET request for creating Layup. NOTE This must come before route for id (i.e. display bunker).
router.get("/layup/create", layup_controller.layup_create_get);

// POST request for creating layup.
router.post("/layup/create", layup_controller.layup_create_post);

// GET request to delete layup.
router.get("/layup/:id/delete", layup_controller.layup_delete_get);

// POST request to delete layup.
router.post("/layup/:id/delete", layup_controller.layup_delete_post);

// GET request to update layup.
router.get("/layup/:id/update", layup_controller.layup_update_get);

// POST request to update layup.
router.post("/layup/:id/update", layup_controller.layup_update_post);

// GET request for one layup.
router.get("/layup/:id", layup_controller.layup_detail);

// GET request for list of all layups.
router.get("/layups", layup_controller.layup_list);

/// OBSTACLE ROUTES ///

// GET request for creating Obstacle. NOTE This must come before route for id (i.e. display bunker).
router.get("/obstacle/create", obstacle_controller.obstacle_create_get);

// POST request for creating obstacle.
router.post("/obstacle/create", obstacle_controller.obstacle_create_post);

// GET request to delete obstacle.
router.get("/obstacle/:id/delete", obstacle_controller.obstacle_delete_get);

// POST request to delete obstacle.
router.post("/obstacle/:id/delete", obstacle_controller.obstacle_delete_post);

// GET request to update obstacle.
router.get("/obstacle/:id/update", obstacle_controller.obstacle_update_get);

// POST request to update obstacle.
router.post("/obstacle/:id/update", obstacle_controller.obstacle_update_post);

// GET request for one obstacle.
router.get("/obstacle/:id", obstacle_controller.obstacle_detail);

// GET request for list of all obstacles.
router.get("/obstacles", obstacle_controller.obstacle_list);

/// RATINGZONE ROUTES ///

// GET request for creating RatingZone. NOTE This must come before route for id (i.e. display bunker).
router.get("/ratingZone/create", ratingZone_controller.ratingZone_create_get);

// POST request for creating ratingZone.
router.post("/ratingZone/create", ratingZone_controller.ratingZone_create_post);

// GET request to delete ratingZone.
router.get("/ratingZone/:id/delete", ratingZone_controller.ratingZone_delete_get);

// POST request to delete ratingZone.
router.post("/ratingZone/:id/delete", ratingZone_controller.ratingZone_delete_post);

// GET request to update ratingZone.
router.get("/ratingZone/:id/update", ratingZone_controller.ratingZone_update_get);

// POST request to update ratingZone.
router.post("/ratingZone/:id/update", ratingZone_controller.ratingZone_update_post);

// GET request for one ratingZone.
router.get("/ratingZone/:id", ratingZone_controller.ratingZone_detail);

// GET request for list of all ratingZones.
router.get("/ratingZones", ratingZone_controller.ratingZone_list);

/// ROLL ROUTES ///

// GET request for creating Roll. NOTE This must come before route for id (i.e. display bunker).
router.get("/roll/create", roll_controller.roll_create_get);

// POST request for creating roll.
router.post("/roll/create", roll_controller.roll_create_post);

// GET request to delete roll.
router.get("/roll/:id/delete", roll_controller.roll_delete_get);

// POST request to delete roll.
router.post("/roll/:id/delete", roll_controller.roll_delete_post);

// GET request to update roll.
router.get("/roll/:id/update", roll_controller.roll_update_get);

// POST request to update roll.
router.post("/roll/:id/update", roll_controller.roll_update_post);

// GET request for one roll.
router.get("/roll/:id", roll_controller.roll_detail);

// GET request for list of all rolls.
router.get("/rolls", roll_controller.roll_list);

/// RR ROUTES ///

// GET request for creating RR. NOTE This must come before route for id (i.e. display bunker).
router.get("/rR/create", rR_controller.rR_create_get);

// POST request for creating rR.
router.post("/rR/create", rR_controller.rR_create_post);

// GET request to delete rR.
router.get("/rR/:id/delete", rR_controller.rR_delete_get);

// POST request to delete rR.
router.post("/rR/:id/delete", rR_controller.rR_delete_post);

// GET request to update rR.
router.get("/rR/:id/update", rR_controller.rR_update_get);

// POST request to update rR.
router.post("/rR/:id/update", rR_controller.rR_update_post);

// GET request for one rR.
router.get("/rR/:id", rR_controller.rR_detail);

// GET request for list of all rRs.
router.get("/rRs", rR_controller.rR_list);

/// SURFACE ROUTES ///

// GET request for creating Surface. NOTE This must come before route for id (i.e. display bunker).
router.get("/surface/create", surface_controller.surface_create_get);

// POST request for creating surface.
router.post("/surface/create", surface_controller.surface_create_post);

// GET request to delete surface.
router.get("/surface/:id/delete", surface_controller.surface_delete_get);

// POST request to delete surface.
router.post("/surface/:id/delete", surface_controller.surface_delete_post);

// GET request to update surface.
router.get("/surface/:id/update", surface_controller.surface_update_get);

// POST request to update surface.
router.post("/surface/:id/update", surface_controller.surface_update_post);

// GET request for one surface.
router.get("/surface/:id", surface_controller.surface_detail);

// GET request for list of all surfaces.
router.get("/surfaces", surface_controller.surface_list);

/// TARGET ROUTES ///

// GET request for creating Target. NOTE This must come before route for id (i.e. display bunker).
router.get("/target/create", target_controller.target_create_get);

// POST request for creating target.
router.post("/target/create", target_controller.target_create_post);

// GET request to delete target.
router.get("/target/:id/delete", target_controller.target_delete_get);

// POST request to delete target.
router.post("/target/:id/delete", target_controller.target_delete_post);

// GET request to update target.
router.get("/target/:id/update", target_controller.target_update_get);

// POST request to update target.
router.post("/target/:id/update", target_controller.target_update_post);

// GET request for one target.
router.get("/target/:id", target_controller.target_detail);

// GET request for list of all targets.
router.get("/targets", target_controller.target_list);

/// TEE ROUTES ///

// GET request for creating Tee. NOTE This must come before route for id (i.e. display bunker).
router.get("/tee/create", tee_controller.tee_create_get);

// POST request for creating tee.
router.post("/tee/create", tee_controller.tee_create_post);

// GET request to delete tee.
router.get("/tee/:id/delete", tee_controller.tee_delete_get);

// POST request to delete tee.
router.post("/tee/:id/delete", tee_controller.tee_delete_post);

// GET request to update tee.
router.get("/tee/:id/update", tee_controller.tee_update_get);

// POST request to update tee.
router.post("/tee/:id/update", tee_controller.tee_update_post);

// GET request for one tee.
router.get("/tee/:id", tee_controller.tee_detail);

// GET request for list of all tees.
router.get("/tees", tee_controller.tee_list);

/// TOPO ROUTES ///

// GET request for creating Topo. NOTE This must come before route for id (i.e. display bunker).
router.get("/topo/create", topo_controller.topo_create_get);

// POST request for creating topo.
router.post("/topo/create", topo_controller.topo_create_post);

// GET request to delete topo.
router.get("/topo/:id/delete", topo_controller.topo_delete_get);

// POST request to delete topo.
router.post("/topo/:id/delete", topo_controller.topo_delete_post);

// GET request to update topo.
router.get("/topo/:id/update", topo_controller.topo_update_get);

// POST request to update topo.
router.post("/topo/:id/update", topo_controller.topo_update_post);

// GET request for one topo.
router.get("/topo/:id", topo_controller.topo_detail);

// GET request for list of all topos.
router.get("/topos", topo_controller.topo_list);

/// TREE ROUTES ///

// GET request for creating Tree. NOTE This must come before route for id (i.e. display bunker).
router.get("/tree/create", tree_controller.tree_create_get);

// POST request for creating tree.
router.post("/tree/create", tree_controller.tree_create_post);

// GET request to delete tree.
router.get("/tree/:id/delete", tree_controller.tree_delete_get);

// POST request to delete tree.
router.post("/tree/:id/delete", tree_controller.tree_delete_post);

// GET request to update tree.
router.get("/tree/:id/update", tree_controller.tree_update_get);

// POST request to update tree.
router.post("/tree/:id/update", tree_controller.tree_update_post);

// GET request for one tree.
router.get("/tree/:id", tree_controller.tree_detail);

// GET request for list of all trees.
router.get("/trees", tree_controller.tree_list);

module.exports = router;
