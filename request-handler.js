const User = require('/models/user.js');
// const User = require('/models/user.js');

// exports.logout = (ctx) => {
//   // req.session.destroy(function() {
//     // res.redirect('/login');
//   // });
// }

exports.signin = (ctx) => {
  var username = ctx.request.body.username;
  var password = ctx.request.body.password;

  new User({ username: username }).fetch()
    .then( (user) => {
      if (!user) {
        res.redirect('/login');
      } else {
        user.comparePassword(password, function(match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        });
      }
    });
};
