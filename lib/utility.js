var request = require('request');

// var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;
// exports.isValidUrl = function(url) {
//   return url.match(rValidUrl);
// };

exports.isLoggedIn = (ctx) => {
  return ctx.session ? !!ctx.session.user : false;
};

exports.checkUser = (ctx) => {
  if ( !exports.isLoggedIn(ctx) ) {
    ctx.redirect('/login');
  } else {
    next();
  }
};

exports.createSession = (ctx) => {
  return ctx.session.regenerate(function() {
      ctx.session.user = newUser;
      ctx.redirect('/');
    });
};


// this.regenerateSession
