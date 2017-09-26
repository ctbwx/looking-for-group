const User = require('./models/user.js');

// exports.logout = (ctx) => {
//   // req.session.destroy(function() {
//     // res.redirect('/login');
//   // });
// }

// exports.login = async (ctx) => {
//   var username = ctx.request.body.username;
//   var password = ctx.request.body.password;
//
//   new User({ username: username }).fetch()
//     .then( (user) => {
//       if (!user) {
//         res.redirect('/login');
//       } else {
//         user.comparePassword(password, function(match) {
//           if (match) {
//             util.createSession(req, res, user);
//           } else {
//             res.redirect('/login');
//           }
//         });
//       }
//     });
// };

exports.login = async (ctx) => {

  ({username, password} = ctx.request.body);

  await User.findOne({username: username}).exec( (err, user) => {
    if (!user){
      ctx.redirect('/');
    } else {
      User.checkPassword(password, user.password, (err, match) => {
        if(match){
          ctx.body = `login successful with id: ${user._id}`;
        } else {
          ctx.redirect('/');
        }
      });
    }
  });
};
