const express = require('express');
const router = express.Router();

const submitForm = require('../controllers/submitForm');

router.route('/apply').post(submitForm);

module.exports = router;