const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helper/auth')
const mongoose = require('mongoose');

//Load Idea Model
const User = mongoose.model('users');
const Idea = mongoose.model('ideas');

router.get('/', (req, res) => {
	
	res.render('ideas/index');

});

router.get('/add',ensureAuthenticated, (req, res) => {

	res.render('ideas/add');

});



//Process adding ideas
router.post('/', (req, res) => {
	let allowComments
	if(req.body.allowComments){
		allowComments = true;
	}else{
		allowComments = false;
	}

	const newIdea = {
		title : req.body.title,
		body : req.body.body,
		status : req.body.status,
		allowComments : allowComments,
		user: req.user.id
	}

	//Create Idea
	new Idea(newIdea)
	.save()
	.then(idea => {
		res.redirect(`/ideas/show/${idea_id}`)
	})
});



module.exports = router;
