const express = require('express');
const router = express();
const {handleUserSignup , handleUserLogin } = require('../controllers/user')


router.post('/',handleUserSignup);
router.post('/login',handleUserLogin);




module.exports = router;