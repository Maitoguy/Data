const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();


router.get('/' , controller.fetchApi);

router.get('/post' , controller.fetchPost);







module.exports = router;