const supabaseAdmin = require('../config/supabase')
const findMemberByFirebaseUid = require('../utils/findMember');



const getAllDues = async (req, res) => {
   let table
const type = req.query.type
const from = req.query.from
const to = req.query.to
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

    if (from && to && type === 'annual') {
      const { data, error } = await supabaseAdmin
        .from('annual_dues')
        .select('*, members(full_name)')
        .gte('year', from)
        .lte('year', to);
      if (error) throw error;
      return res.json({ annual_dues: data });
    }


    if (type === 'outstanding') {
      const { data, error } = await supabaseAdmin.from('all_deficits').select('full_name, source_table, deficit');
      if (error) throw error;
      return res.json({ deficits: data });
    }


    const { data, error } = await supabaseAdmin.from(table).select('*, members(full_name)');
    if (error) throw error;
    return res.json({ [table]: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};
const getSingleMemberDues = async (req, res) => {
   let table
const type = req.query.type
const from = req.query.from
const to = req.query.to
const firebaseUid = req.params.id

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

     const member = await findMemberByFirebaseUid(firebaseUid);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    if (from && to && type === 'annual') {
      const { data, error } = await supabaseAdmin
        .from('annual_dues')
        .select('*, members(full_name)')
        .eq('member_id', member.member_id)
        .gte('year', from)
        .lte('year', to);
      if (error) throw error;
      return res.json({ annual_dues: data });
    }

    if (type === 'outstanding') {
      const { data, error } = await supabaseAdmin.from('all_deficits')
      .select('full_name, source_table, deficit')
      .eq('member_id', member.member_id);

      if (error) throw error;
      return res.json({ deficits: data });
    }
    const { data, error } = await supabaseAdmin.from(table)
    .select('*, members(full_name)')
    .eq('member_id', member.member_id);
    if (error) throw error;
    return res.json({ [table]: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};




module.exports = {
    getAllDues,
    getSingleMemberDues
};