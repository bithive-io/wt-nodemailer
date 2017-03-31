var app = new(require('express'));
var Webtask = require('webtask-tools');

app.post('/mailer/echo', function (req, res) {
  res.status(200).send(req.webtaskContext.data.body);
});

// [POST] hire

app.post('/mailer/hire', function (req, res) {

  var subject = 'New HIRE Message from ' + req.webtaskContext.body.name + ' <' + req.webtaskContext.body.email +'>';
  var content = '- ORGANIZATION: ' + req.webtaskContext.body.org + '\n' + '- MESSAGE: \n' + req.webtaskContext.body.message;

  var Sendgrid = require('sendgrid')(req.webtaskContext.secrets.SG_KEY);

  Sendgrid.send({
    to: req.webtaskContext.secrets.SG_TO,
    from: req.webtaskContext.secrets.SG_FROM,
    subject: subject,
    text: content
  }, function(err, json) {
    if(err)
    res.status(500).send(err);
    else
    res.status(200).send("ok");
  });
});


// [POST] join

app.post('/mailer/join', function (req, res) {

  var subject = 'New JOIN Message from ' + req.webtaskContext.body.name + ' <' + req.webtaskContext.body.email +'>';
  var content = "- NAME:" + req.webtaskContext.body.name + "\n" +
  "- EMAIL: " + req.webtaskContext.body.email + "\n" +
  "- AVAILABILITY (hs): " + req.webtaskContext.body.availability + "\n" +
  "- LOCATION: " + req.webtaskContext.body.location + "\n" +
  "- SKILL: " + req.webtaskContext.body.skill + "\n" +
  "- WEBSITE: " + req.webtaskContext.body.website + "\n" +
  "- LINKEDIN: " + req.webtaskContext.body.linkedin + "\n" +
  "- GITHUB: " + req.webtaskContext.body.github + "\n" +
  "- MESSAGE: \n" + req.webtaskContext.body.message;

  var Sendgrid = require('sendgrid')(req.webtaskContext.secrets.SG_KEY);

  Sendgrid.send({
    to: req.webtaskContext.secrets.SG_TO,
    from: req.webtaskContext.secrets.SG_FROM,
    subject: subject,
    text: content
  }, function(err, json) {
    if(err)
    res.status(500).send(err);
    else
    res.status(200).send("ok");;
  });
})


module.exports = Webtask.fromExpress(app);
