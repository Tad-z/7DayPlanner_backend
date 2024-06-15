const express = require("express");
const { postPlans, getPlans } = require("../controllers/plan");
const auth = require("../Authorization/auth");
const router = express.Router();

router.post('/events', auth, postPlans);
router.get('/:week_id', auth, getPlans);


module.exports = router;