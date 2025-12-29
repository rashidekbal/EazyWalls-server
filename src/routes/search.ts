import {Router} from "express";
import { searchController } from "../controller/search.js";
const router=Router();
router.route("/").get(searchController);

export default router;