import express from "express";
import {
  createItem,
  getApprovedItems,
  getPending,
  updateStatus,
  claimItem
} from "../controller/itemController.js";


const router=express.Router();

router.post("/",createItem);
router.get("/",getApprovedItems);
router.get("/pending",getPending);
router.patch("/:id/status",updateStatus);
router.patch("/:id/claim",claimItem);


export default router;