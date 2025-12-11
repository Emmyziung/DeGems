const express = require('express');
const router = express.Router();



const {getMember, getMemberDues} = require('../controllers/supabase');

router.route('/').get(getMember);
router.route('/dues').get(getMemberDues)

module.exports = router;