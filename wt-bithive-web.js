var app = new(require('express'));
var Webtask = require('webtask-tools');

app.use(require('body-parser').raw());

app.post('/mailer/echo', function (req, res) {
  res.status(200).send(req.body.name);
});

// [POST] hire

app.post('/mailer/hire', function (req, res) {

  var subject = 'New HIRE Message from ' + req.body.name + ' <' + req.body.email +'>';
  var content = '- ORGANIZATION: ' + req.body.org + '\n' + '- MESSAGE: \n' + req.body.message;

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

  var subject = 'New JOIN Message from ' + req.body.name + ' <' + req.body.email +'>';
  var content = "- NAME:" + req.body.name + "\n" +
  "- EMAIL: " + req.body.email + "\n" +
  "- AVAILABILITY (hs): " + req.body.availability + "\n" +
  "- LOCATION: " + req.body.location + "\n" +
  "- SKILL: " + req.body.skill + "\n" +
  "- WEBSITE: " + req.body.website + "\n" +
  "- LINKEDIN: " + req.body.linkedin + "\n" +
  "- GITHUB: " + req.body.github + "\n" +
  "- MESSAGE: \n" + req.body.message;

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
