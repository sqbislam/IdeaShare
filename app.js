const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const exphbs = require('express-handlebars')
//Load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
//Load keys.js
const keys = require('./config/keys');
const port = process.env.PORT || 5000;

//Load user model
require('./models/User')
//Passport config
require('./config/passport')(passport)

//Mongoose connect

	//Maps promise to global 
mongoose.Promise = global.Promise;
	//Connect
mongoose.connect(keys.mongoURI,
	{ useNewUrlParser: true})
	.then( () => console.log('Mongo Connected'))
	.catch((err) => console.log(err) )


//init express app
const app  = express();


//Session and Cookie parser middle ware
app.use(cookieParser())
app.use(session({
	secret: 'secret',
  	resave: false,
  	saveUninitialized: false,
}))

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
})



//Anything that goes to /auth will go to auth route
app.use('/auth', auth);
//Anything that goes to /auth will go to auth route
app.use('/', index);



app.listen(port, ()=> {
	
	console.log(`Server started on port ${port}`);

})

