const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helper/auth')
const mongoose = require('mongoose');

//Load Idea Model
const User = mongoose.model('users');
const Idea = mongoose.model('ideas');


//Show Single idea route
router.get('/show/:id', (req, res) =>{

	Idea.findOne({_id: req.params.id })
	.populate('user')
	.then(idea =>{
		res.render('ideas/show', {ideas: idea});
	});
});




//Public ideas route
router.get('/', (req, res) => {
	Idea.find({status: 'public'})
	.populate('user')
	.then(idea => {
		res.render('ideas/index', {ideas: idea});
	});
});

//Add form
router.get('/add',ensureAuthenticated, (req, res) => {
	res.render('ideas/add');
});

//Edit form
router.get('/edit/:id',ensureAuthenticated, (req , res) => {
	
	Idea.findOne({_id: req.params.id })
	.populate('user')
	.then(idea =>{
		res.render('ideas/edit', {
			idea:idea
		});
	});

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
		res.redirect(`/ideas/show/${idea.id}`)
	})
});


//EDIT form PUT request handling

router.put('/:id', ensureAuthenticated, (req, res) => {

	Idea.findOne({_id: req.params.id })
	.then(idea =>{
		let allowComments
		if(req.body.allowComments){
			allowComments = true;
		}else{
			allowComments = false;
		}

		//New values
		idea.title = req.body.title
		idea.body = req.body.body;
		idea.status = req.body.status;
		idea.allowComments = allowComments;

		idea.save()
			.then(idea => {
				res.redirect('/dashboard')
			})

	});
} )


//DELETE request handling
router.delete('/:id', ensureAuthenticated, (req, res) =>{
	Idea.remove({_id: req.params.id})
	.then(idea => {
		res.redirect('/dashboard')
	});
});

module.exports = router;
