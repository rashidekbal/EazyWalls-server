import express from "express";
import { getCategoriesController } from "../controller/category.js";
const router =express.Router();
router.route("/").get(getCategoriesController)
export default router;