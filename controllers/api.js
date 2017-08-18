var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = process.env.MONGODB_URI || '';

MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to Mongo.");
  db.close();
});

var insertOrder = function (db, data, callback) {
  db.collection('orders').insertOne(data, function (err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the orders collection.");
    callback();
  });
};

var sendMail = function(emailAddress, reservationDate, callback) {
  if(!process.env.SENDGRID_API_KEY) return;

  var helper = require('sendgrid').mail;
  var from_email = new helper.Email('harvey.chan@solarcity.com');
  var to_email = new helper.Email(emailAddress);
  var subject = 'Your SolarPhone/PowerJet Reservation Details';
  var content = new helper.Content('text/plain', 'Hello! Your reservation has been received. The estimated delivery date is '+reservationDate+'.');
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
    callback();
  });
};

/**
 * POST /order
 */
exports.postOrder = (req, res) =>
{
  // req.assert('name', 'Name cannot be blank').notEmpty();
  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('message', 'Message cannot be blank').notEmpty();

  // const errors = req.validationErrors();

  // if (errors) {
  //   req.flash('errors', errors);
  //   return res.redirect('/contact');
  // }

  // const mailOptions = {
  //   to: 'your@email.com',
  //   from: `${req.body.name} <${req.body.email}>`,
  //   subject: 'Contact Form | Hackathon Starter',
  //   text: req.body.message
  // };

  // transporter.sendMail(mailOptions, (err) => {
  //   if (err) {
  //     req.flash('errors', { msg: err.message });
  //     return res.redirect('/contact');
  //   }
  //   req.flash('success', { msg: 'Email has been sent successfully!' });
  //   res.redirect('/contact');
  // });

  var data = req.body;
  console.log(data);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertOrder(db, data, function() {
      // sendMail(data.email, '08/18/2017', function(){res.end("success");}); //todo: figure out why email doesnt work
      res.end("success");
    });
  });

}
;