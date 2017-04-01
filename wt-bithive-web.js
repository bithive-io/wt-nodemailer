var app = new(require('express'));
var Webtask = require('webtask-tools');

const SG_BR = '=0D';

app.use(require('body-parser').json());


// [POST] hire

app.post('/mailer/hire', function (req, res) {

  var subject = 'New HIRE Message from ' + req.body.name + ' <' + req.body.email +'>';
  var content = 'ORGANIZATION: ' + req.body.org + SG_BR + 'MESSAGE: ' + SG_BR + req.body.message;

  var Sendgrid = require('sendgrid')(req.webtaskContext.secrets.SG_KEY);

  Sendgrid.send({
    to: req.webtaskContext.secrets.SG_TO,
    from: req.webtaskContext.secrets.SG_FROM,
    subject: subject,
    text: content
  }, function(err, json) {
    if(err)
      res.status(500).json({ success : false });
    else
      res.status(200).json({ success : true });
  });
});


// [POST] join

app.post('/mailer/join', function (req, res) {

  var subject = 'New JOIN Message from ' + req.body.name + ' <' + req.body.email +'>';
  var content = "NAME:" + req.body.name + SG_BR +
  "EMAIL: " + req.body.email + SG_BR +
  "AVAILABILITY (hs): " + req.body.availability + SG_BR +
  "LOCATION: " + req.body.location + SG_BR +
  "SKILL: " + req.body.skill + SG_BR +
  "WEBSITE: " + req.body.website + SG_BR +
  "LINKEDIN: " + req.body.linkedin + SG_BR +
  "GITHUB: " + req.body.github + SG_BR +
  "MESSAGE: " + SG_BR + req.body.message;

  var Sendgrid = require('sendgrid')(req.webtaskContext.secrets.SG_KEY);

  Sendgrid.send({
    to: req.webtaskContext.secrets.SG_TO,
    from: req.webtaskContext.secrets.SG_FROM,
    subject: subject,
    text: content
  }, function(err, json) {
    if(err)
      res.status(500).json({ success : false });
    else
      res.status(200).json({ success : true });
  });
})


module.exports = Webtask.fromExpress(app);
