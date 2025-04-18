"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LessonProgress_controller_1 = require("../controllers/LessonProgress.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.get("/", LessonProgress_controller_1.getLessonProgresses);
router.get("/:id", LessonProgress_controller_1.getLessonProgressById);
router.post("/", verifyToken_1.verifyAccessToken, LessonProgress_controller_1.createLessonProgress);
router.put("/:id", verifyToken_1.verifyAccessToken, LessonProgress_controller_1.updateLessonProgress);
router.delete("/:id", verifyToken_1.verifyAccessToken, LessonProgress_controller_1.deleteLessonProgress);
exports.default = router;
