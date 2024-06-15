const express = require("express");
const { signUp, logIn, getUser } = require("../controllers/user");
const router = express.Router();

router.post('/users', signUp);
router.post('/login', logIn);
router.get('/users/:id', getUser);


module.exports = router;