const express = require("express");
const { signUp, logIn, getUser } = require("../controllers/user");
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/:id', getUser);


module.exports = router;