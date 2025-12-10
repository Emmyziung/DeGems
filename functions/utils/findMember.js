const supabaseAdmin = require('../config/supabase')

const findMemberByFirebaseUid = async (firebaseUid) => {
    const { data, error } = await supabaseAdmin
    .from('members')
    .select('*')
    .eq('firebase_uid', firebaseUid)
    .maybeSingle();

  if (error) throw error;
  return data;
}

module.exports = findMemberByFirebaseUid;