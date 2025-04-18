import { Router } from "express";
import multer from 'multer'
import { createUser, getCurrent, getUser, getUsers, logout, register, login } from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/verifyToken";

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Các route xử lý người dùng
router.get("/current", verifyAccessToken, getCurrent);
router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/logout", logout);

router.post("/", upload.fields([
    { name: 'image', maxCount: 1 },
]), verifyAccessToken, createUser);

export default router;
