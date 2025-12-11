const express = require('express');
const router = express.Router();


const { getAllDues, getSingleMemberDues } = require('../controllers/adminSupabase');

router.route('/members/all-dues').get(getAllDues);
router.route('/members/:id/dues').get(getSingleMemberDues);
module.exports = router;