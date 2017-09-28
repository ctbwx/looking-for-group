const User = require('./models/user.js');


exports.checkSession = async (ctx, next) => {
  let isLoggedIn = ctx.session? !!ctx.session.id : false;
  if ( isLoggedIn ) {
    ctx.body = `already signed in with session: ${ctx.session.id}`;
    // ctx.redirect('/');
  } else {
    await next();
  }
};


exports.checkUsername = async (ctx, next) => {
  let username = ctx.request.body.username;
  await User.findOne( {username: ctx.request.body.username} )
    .then( (user) => {
      if(user) {
        ctx.user = user;
      };
    });
  await next();
};


exports.login = async (ctx) => {
  if(!ctx.user){
    ctx.status = 404;
    ctx.body = 'incorrect username';
    // ctx.redirect('/');
  } else {
    ({username, password} = ctx.request.body);
    await User.checkPassword(password, ctx.user.password)
      .then( (match) => {
        if( match ){
          ctx.session.id = ctx.user._id;
          console.log(`login successful: assigning session id... ${ctx.session.id}`);
          // ctx.status = 200;
          ctx.body = {
            id: ctx.user._id,
            username: username
          }
        } else {
          ctx.body = `login fail: wrong password`;
        }
      })
      // .catch( (err) => {
      // })

  }
};


exports.logout = (ctx) => {
  let id = ctx.session.id;
  ctx.session = null;
  ctx.body = `destroying session of user id: ${id}`;
  // ctx.redirect('/');
};


exports.signup = async (ctx) => {
  if(ctx.user){
    ctx.status = 400;
    ctx.body = `signup fail: username already exists`;
    // ctx.redirect('/');

  } else {
    let newUser = await new User(ctx.request.body)
      .save( (err) => {
        if(err){
          ctx.status = 500;
          ctx.body = `FAIL: NEW USER WAS NOT SAVED TO DB`;
        }
      });
    console.log(`SUCCESS: NEW USER SAVED TO DB`);
    ctx.status = 201;
    ctx.body = {
      id: newUser._id,
      username: newUser.username
    };
    ctx.session.id = newUser._id;
    console.log(`assigning sesssion id...: ${ctx.session.id}`);
  }
};
