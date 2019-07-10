const express = require('express');
const router = express.Router();
const ctrl = require('../controller/article.js');

router.get('/article/add', ctrl.articlePage);
router.post('/article/add', ctrl.addArticle);
router.get('/article/info/:id', ctrl.infoPage);
router.get('/article/edit/:id', ctrl.articleEdit);
router.post('/article/edit/', ctrl.update);
module.exports = router;