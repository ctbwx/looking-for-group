const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const session = require('koa-session');
// const browserify = require('browserify-middleware');
const serve = require('koa-static');

const dbconfig = require('./dbconfig.js'); //uncomment when ready to connect to db
const User = require('./models/user.js');

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

router.get('/test', async (ctx, next) => {
    var newUser = await new User({
      username: 'testUser',
      password: 'admin'
    }).save()
    .catch( (err) => {
      console.log(`FAILED TO SAVE: ${err}`);
      ctx.status = 500;
      ctx.body = `FAILED TO SAVE`;
    });

    ctx.status = 200;

    ctx.body = {
      id: newUser._id,
      username: newUser.username
    };

  });
  // .get('/bundle.js', browserify('./client/index.js'),
  //  { transform: [[ require('babelify'), {presets: ['es2015', 'react']} ]] } )
  // .get('/login', (ctx) => {
  //   ctx.body = `you have reached get: /login`;
  //   // req.body with username, password
  //   // check username in db.users
  //   // bcrypt.compare password against db.users.password
  //   // grant session
  //   // send db.users.id
  // })
  // .post('/signup', (ctx) => {
  //   // req.body with username, password
  //   // check username in db.users
  //   // bcrypt.hash password and save in db.users.password
  //   // grant session
  //   // send db.users.id
  // })
  // .get('/pin', (ctx) => {
  //   // req.body with pin_id
  //   // check pin_id in db.pins.id
  //   //
  // })
  // .post('/pin', (ctx) => {
  //   // pin title
  //   // pin description
  //   // long, lat
  //   // host_id
  // });

app.use( router.routes() );
  // .use( router.allowedMethods(
  //
  // ));

module.exports = app;
