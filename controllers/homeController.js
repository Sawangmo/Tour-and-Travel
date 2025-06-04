// controllers/homeController.js

exports.getHomePage = (req, res) => {
    res.render('pages/home', {
      title: 'Home',
      user: req.session.user || null
    });
};
  