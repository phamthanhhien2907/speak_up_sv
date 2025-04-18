"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedback_controller_1 = require("../controllers/feedback.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.get("/", feedback_controller_1.getFeedbacks);
router.get("/:id", feedback_controller_1.getFeedbackById);
router.post("/", verifyToken_1.verifyAccessToken, feedback_controller_1.createFeedback);
router.put("/:id", verifyToken_1.verifyAccessToken, feedback_controller_1.updateFeedback);
router.delete("/:id", verifyToken_1.verifyAccessToken, feedback_controller_1.deleteFeedback);
exports.default = router;
