const Pin = require('./models/pin.js');


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

exports.createPin = async (ctx) => {
  ctx.request.body.host_id = ctx.session.id;

  let newPin = await new Pin(ctx.request.body)
    .save( (err) => {
      if(err){
        ctx.status = 500;
        ctx.body = "FAIL: NEW PIN WAS NOT SAVED TO DB";
      }
    });
    console.log("SUCCESS: NEW PIN SAVED TO DB");
    ctx.status = 201;
    ctx.body = "pin: " + newPin._id + " was successfully created."
};