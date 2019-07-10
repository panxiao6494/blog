const express = require('express');
const router = express.Router();

const ctrl = require('../controller/user.js')


router.get('/register', ctrl.showRigister);

router.get('/login', ctrl.showLogin);

router.get('/loginout', ctrl.loginout)
router.post('/register', ctrl.rigister);
router.post('/login', ctrl.login);

module.exports = router;