const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const session = require('koa-session');
// const browserify = require('browserify-middleware');
const serve = require('koa-static');

const dbconfig = require('./dbconfig.js'); //uncomment when ready to connect to db
const User = require('./models/user.js');
const userHandler = require('./user-handler.js');
const pinHandler = require('./pin-handler.js');

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
  .post('/login', userHandler.checkUsername, userHandler.login)
    // grant session
    // send db.users.id
  .post('/signup', userHandler.checkUsername, userHandler.signup)
  //   // grant session
  //   // send db.users.id

  .get('/getPins', pinHandler.retrievePins)
  //   //
  .post('/newPin', pinHandler.createPin)
  //   // pin title
  //   // pin description
  //   // long, lat
  //   // host_id
  .get('/test', async (ctx, next) => {
      try {
        var newUser = await new User({
          username: 'testUser',
          password: 'admin'
        }).save();
        console.log(`SAVE TO DB SUCCESS`);
        // ctx.status = 200;
        ctx.body = {
          id: newUser._id,
          username: newUser.username
        };

      } catch (err) {
        console.log(`FAILED TO SAVE: ${err}`);
        ctx.status = 500;
        ctx.body = `FAILED TO SAVE`;

      }
    });
app.use( router.routes() );
  // .use( router.allowedMethods(
  //
  // ));

module.exports = app;
