const express = require('express');
const router = express.Router();

const ctrl = require('../controller/index.js');
//首页
router.get('/', ctrl.showIndex);

module.exports = router;