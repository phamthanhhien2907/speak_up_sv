"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const history_controller_1 = require("../controllers/history.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.get("/", history_controller_1.getHistories);
router.get("/:id", history_controller_1.getHistoryById);
router.post("/", verifyToken_1.verifyAccessToken, history_controller_1.createHistory);
router.put("/:id", verifyToken_1.verifyAccessToken, history_controller_1.updateHistory);
router.delete("/:id", verifyToken_1.verifyAccessToken, history_controller_1.deleteHistory);
exports.default = router;
