import express from "express";
import { adminLogin, adminLogout, verifyAdmin } from "../controller/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/verify", verifyAdmin);

export default router;