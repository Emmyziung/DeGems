const supabaseAdmin = require('../config/supabase')

const getAllAnnualDues = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('annual_dues').select('*, members(full_name)');
    if (error) throw error;
    return res.json({ annual_dues: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};

const getAllLoans = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('loans').select('*, members(full_name)');
    if (error) throw error;
    return res.json({ loans: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};
const getAllSanctions = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('sanctions').select('*, members(full_name)');
    if (error) throw error;
    return res.json({ sanctions: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};
const getAllProjects = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('project_contributions').select('*, members(full_name)');
    if (error) throw error;
    return res.json({ projects: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: err.message || err });
  }
};

module.exports = {
    getAllAnnualDues,
    getAllLoans,
    getAllSanctions,
    getAllProjects
};