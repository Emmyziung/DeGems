const findMemberByFirebaseUid = require('../utils/findMember');
const supabaseAdmin = require('../config/supabase')


const getMember = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;
    console.log("Fetching member for firebaseUid: ", firebaseUid);
    const member = await findMemberByFirebaseUid(firebaseUid);
    console.log("Found member: ", member);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    return res.json({ member });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
}
 

const getMemberDues = async (req, res) => {
  let table
const type = req.query.type

switch (type) {
  case 'annual': table = 'annual_dues'; break;
    case 'monthly': table = 'monthly_dues'; break;
    case 'loan': table = 'loans'; break;
    case 'project': table = 'project_contributions'; break;
    case 'sanction': table = 'sanctions'; break;
    case 'outstanding': table = 'all_deficits'; break;
    default:
      return res.status(400).json({ error: 'Invalid type parameter' });
}

  try {
    const firebaseUid = req.user.uid;
    const member = await findMemberByFirebaseUid(firebaseUid);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const { data, error } = await supabaseAdmin
      .from(table)
      .select('*')
      .eq('member_id', member.member_id);

    if (error) throw error;
    return res.json({ [type]: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};


module.exports = {
    getMember,
    getMemberDues,
    
};