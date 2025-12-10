

const requireAdminMiddleware = (req, res, next) => {
      const claims = req.user || {};
  const isAdmin = claims.admin === true || claims.role === 'admin' || claims.role === 'superadmin';
  if (!isAdmin) return res.status(403).json({ error: 'Forbidden: admin only' });
  return next();
}

module.exports = requireAdminMiddleware;