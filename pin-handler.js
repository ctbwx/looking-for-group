const Pin = require('./models/pin.js');
const User = require('./models/user.js');

// This fetches all pins from the data base and sends the client an Array of all the pins.
exports.retrievePins = async (ctx) => {
  await Pin.find()
    .then( (pins) => {
      ctx.status = 201;
      ctx.body = pins;
    })
    .catch( (err) => {
      ctx.status = 404;
      ctx.body = "This is not what you are looking for.";
    })
};

// This saves a pin to the data base that has been created in the client.
exports.createPin = async (ctx) => {
  // This is setting the pin ID as the session.id, which is the exact same as the current user ID.
  if (ctx.session.id) {
    ctx.request.body.host_id = ctx.session.id
    let newPin = await new Pin(ctx.request.body)
      .save( (err) => {
        if(err){
          ctx.status = 500;
          ctx.body = "FAIL: NEW PIN WAS NOT SAVED TO DB";
        }
      });

    // This is pushing each new pin's id to an Array property on the user model that tracks all the pins they made.
    User.findByIdAndUpdate(
      newPin.host_id, // model id agrument.
      {$push: { "pins": newPin._id }}, // choose the Array property on model object to push too.
      {safe: true, upsert: true, new : true}, //params
      function(err, model) {
          console.log(err);
      }
    );

    console.log("SUCCESS: NEW PIN SAVED TO DB");
    ctx.status = 201;
    ctx.body = "pin: " + newPin._id + " was successfully created."
  } else {
    ctx.redirect('/login');
  }
};
