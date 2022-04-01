const { requireSignIn, userMiddleware } = require("../middleware/auth");
const { addOrder, getOrders, getOrder } = require("../Controller/orderController");
const router = require("express").Router();

router.post("/addOrder", requireSignIn, userMiddleware, addOrder);
router.get("/getOrders", requireSignIn, userMiddleware, getOrders);
router.post("/getOrder", requireSignIn, userMiddleware, getOrder);

module.exports = router;