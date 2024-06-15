const express = require("express");
const { postPlans, getPlans } = require("../controllers/plan");
const router = express.Router();

router.post('/events', postPlans);
router.get('/:week_id', getPlans);


module.exports = router;