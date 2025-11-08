import express from "express";
import { getOrderHistory, placedOrder } from "../controller/orderController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/placeholder", protectRoute, placedOrder);
router.get("/orderHistory", protectRoute, getOrderHistory);

export default router;
