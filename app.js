const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Passport config
require('./config/passport')(passport)


//Load routes
const auth = require('./routes/auth');

//init express app
const app  = express();


app.get('/', (req, res) => {

	res.send('It works!!')
})

//Anything that goes to /auth will go to auth route
app.use('/auth', auth);


const port = process.env.port || 5000;

app.listen(port, ()=> {
	
	console.log(`Server started on port ${port}`);

})

