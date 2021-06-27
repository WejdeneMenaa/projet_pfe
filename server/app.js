var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");
//var cors = require('cors')
var indexRouter = require('./routes/utilisateur.routes');
var app = express();
const nodemailer = require("nodemailer");
app.use(bodyParser.json());

//app.use(cors)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "*" }))
app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.json({ 'error': err });
});


app.listen(3000, (req, res) => {
  console.log('RUNNING');
});



/*router.post("/sendmail", (req, res) => {
  console.log("request came");
  let utilisateur = req.body;
  sendMail(utilisateur, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(utilisateur, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      utilisateur: "saharmansouri789@gmail.com",
      pass: "Saharsami123"
    }
  });

  let mailOptions = {
    from: '<saharmansouri789@gmail.com>', // sender address
    to: utilisateur.email, // list of receivers
    subject: "Wellcome to Wimbee !", // Subject line
    html: `<h1>Hi ${utilisateur.name}</h1><br>
    <h4>Thanks for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}*/

module.exports = app;
