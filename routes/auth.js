const express = require('express');
const router = express.Router();
const passport = require('passport')

//Since in auth.js this equivalent to auth\google
router.get('/google', passport.authenticate('google', {
	scope:['profile', 'email']}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {

    res.redirect('/dashboard');
  });

module.exports = router;
