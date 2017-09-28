const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const session = require('koa-session');
// const browserify = require('browserify-middleware');
const serve = require('koa-static');

// const config = require('./config.js'); //uncomment when ready to connect to db
const app = new Koa();
const router = new Router();
const port = 3000;


/*
// Authentication
app.keys = ['praise the sun'];
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false
};
// app.use(session(CONFIG, app));
app.use( session(app) ); //using default CONFIG above
*/


app.use( bodyParser() );
app.use( serve(__dirname + '/client') );

router
<<<<<<< 5004d772aec52fde99cdee05a5bb466ea7b8a966
  .post('/login', userHandler.checkSession, userHandler.checkUsername, userHandler.login)
    // check session
    // check username in database
    // match password, assign session id
  .post('/signup', userHandler.checkUsername, userHandler.signup)
    // check username in database
    // store username/password in database, assign session id
  .get('/logout', userHandler.logout)
    // destroy session, redirect to home
  .get('/get-pins', pinHandler.retrievePins)
    // retrieve pins from db, sends pins to client
  .post('/new-pin', pinHandler.createPin)
    // check session
    // create pin
=======
  // .get('/bundle.js', browserify('./client/index.js'),
  //  { transform: [[ require('babelify'), {presets: ['es2015', 'react']} ]] } )
  .get('/login', (ctx) => {

    // req.body with username, password
    // check username in db.users
    // bcrypt.compare password against db.users.password
    // grant session
    // send db.users.id
  })
  .post('/signup', (ctx) => {
    // req.body with username, password
    // check username in db.users
    // bcrypt.hash password and save in db.users.password
    // grant session
    // send db.users.id
  })
  .get('/pin', (ctx) => {
    // req.body with pin_id
    // check pin_id in db.pins.id
    //
  })
  .post('/pin', (ctx) => {
    // pin title
    // pin description
    // long, lat
    // host_id
  });
>>>>>>> Deployment update

app.use( router.routes() );
  // .use( router.allowedMethods(
  //
  // ));

module.exports = app;
