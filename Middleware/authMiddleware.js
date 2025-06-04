// middleware/authMiddleware.js

// Check if any user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

// Check if the authenticated user is an admin
exports.ensureAdmin = (req, res, next) => {
  const user = req.session.user;

  if (!user || user.role !== 'admin') {
    return res.redirect('/login');
  }

  next();
};

// Check if the authenticated user is a regular (non-admin) user
exports.ensureRegularUser = (req, res, next) => {
  const user = req.session.user;

  if (!user || user.role !== 'user') {
    return res.redirect('/admin'); // Or any other route for non-users
  }

  next();
};
