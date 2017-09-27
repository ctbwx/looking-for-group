const User = require('./models/user.js');

// exports.logout = (ctx) => {
//   // req.session.destroy(function() {
//     // res.redirect('/login');
//   // });
// }

exports.checkUsername = async (ctx, next) => {
  let username = ctx.request.body.username;
  console.log(`checking username...: ${username}`);
  await User.findOne( {username: username} ).then( (user) => {
    if(user) {
      ctx.user = user;
      console.log(`found my user!...: ${ctx.user}`);
    } else {
      console.log(`couldn't find user!`);
    }
    next();
  });
};

exports.login = async (ctx) => {
  if(!ctx.user){
    ctx.status = 404;
    ctx.body = 'incorrect username';
    // ctx.redirect('/');
  } else {
    ({username, password} = ctx.request.body);

    await User.checkPassword(password, user.password, (err, match) => {
      if(match){
        ctx.status = 200;
        ctx.body = `login successful with id: ${user._id}`;
      } else {
        ctx.status = 404;
        ctx.body = `login fail: wrong password`;
        // ctx.redirect('/');
      }
    });
  }
};

exports.signup = async (ctx) => {

  if(ctx.user){
    ctx.status = 400;
    ctx.body = `signup fail: username already exists`;
    // ctx.redirect('/');

  } else {
    // ({username, password} = ctx.request.body);
    let newUser = await new User(ctx.request.body)
      .save( (err) => {
        if(err){
          ctx.status = 500;
          // ctx.response.body = `FAIL: NEW USER WAS NOT SAVED TO DB`;
        }
      });
    console.log(`SUCCESS: NEW USER SAVED TO DB`);
    // ctx.status = 201;
    ctx.body = {
      id: newUser._id,
      username: newUser.username
    };
    console.log(`sending ctx.body...: ${ctx.response.body.id}`);
    // ctx.response.status = 201;
    // await next();
  }

};
