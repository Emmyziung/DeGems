const express = require('express');
const router = express.Router();



const {getMember, getMemberAnnual, getMemberLoan, getMemberSanction, getMemberProjectDues} = require('../controllers/supabase');

router.route('/').get(getMember);
router.route('/annual-dues').get(getMemberAnnual)
router.route('/loans').get(getMemberLoan);
router.route('/sanctions').get(getMemberSanction);
router.route('/projects').get(getMemberProjectDues);

module.exports = router;