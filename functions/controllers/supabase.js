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
 

const getMemberAnnual = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;
    const member = await findMemberByFirebaseUid(firebaseUid);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const { data, error } = await supabaseAdmin
      .from('annual_dues')
      .select('year, paid_amount, deficit')
      .eq('member_id', member.member_id);

    if (error) throw error;
    return res.json({ annual_dues: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};

const getMemberLoan = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;
    const member = await findMemberByFirebaseUid(firebaseUid);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const { data, error } = await supabaseAdmin
      .from('loans')
      .select('loan_amount, paid_amount, date_taken, due_date, deficit')
      .eq('member_id', member.member_id);

    if (error) throw error;

    
    return res.json({ loans: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};

const getMemberSanction = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;
    const member = await findMemberByFirebaseUid(firebaseUid);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const { data, error } = await supabaseAdmin
      .from('sanctions')
      .select('*')
      .eq('member_id', member.member_id);

    if (error) throw error;

    
    return res.json({ sanctions: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};

const getMemberProjectDues = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;
    const member = await findMemberByFirebaseUid(firebaseUid);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const { data, error } = await supabaseAdmin
      .from('project_contributions')
      .select('*')
      .eq('member_id', member.member_id);

    if (error) throw error;

    
    return res.json({ projects: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};

module.exports = {
    getMember,
    getMemberAnnual,
    getMemberLoan,
    getMemberSanction,
    getMemberProjectDues
};