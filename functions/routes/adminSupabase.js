const express = require('express');
const router = express.Router();


const { getAllAnnualDues, getAllLoans, getAllSanctions, getAllProjects } = require('../controllers/adminSupabase');

router.route('/annual-dues').get(getAllAnnualDues);
router.route('/loans').get(getAllLoans);
router.route('/sanctions').get(getAllSanctions);
router.route('/projects').get(getAllProjects);
module.exports = router;