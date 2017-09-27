const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const session = require('koa-session');
const serve = require('koa-static');

const dbconfig = require('./dbconfig.js'); //uncomment when ready to connect to db
const User = require('./models/user.js');
const userHandler = require('./user-handler.js');
const pinHandler = require('./pin-handler.js');


const app = new Koa();
const router = new Router();
const port = 3000;

// Sessions
app.keys = ['praise the sun'];
/*
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false
};
// app.use(session(CONFIG, app));
*/
app.use( session(app) ); //using default CONFIG above


app.use( bodyParser() );
app.use( serve(__dirname + '/client') );

router
  .post('/login', userHandler.checkSession, userHandler.checkUsername, userHandler.login)
    // check session
    // check username in database
    // match password, assign session id
  .post('/signup', userHandler.checkUsername, userHandler.signup)
    // check username in database
    // store username/password in database, assign session id
  .get('/logout', userHandler.logout)
    // destroy session, redirect to home
  .get('/getPins', pinHandler.retrievePins)
    // retrieve pins from db, sends pins to client
  .post('/newPin', userHandler.checkSession, pinHandler.createPin)
    // check session
    // create pin

app.use( router.routes() );
// app.use( router.allowedMethods());

module.exports = app;
