var app = new(require('express'));
var Webtask = require('webtask-tools');

app.post('/mailer/echo', function (req, res) {
  res.status(200).send(req.body.name);
});

app.use(require('body-parser').json());

// [POST] hire

app.post('/mailer/hire', function (req, res) {

  var subject = 'New HIRE Message from ' + req.webtaskContext.data.name + ' <' + req.webtaskContext.data.email +'>';
  var content = '- ORGANIZATION: ' + req.webtaskContext.data.org + '\n' + '- MESSAGE: \n' + req.webtaskContext.data.message;

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

  var subject = 'New JOIN Message from ' + req.webtaskContext.data.name + ' <' + req.webtaskContext.data.email +'>';
  var content = "- NAME:" + req.webtaskContext.data.name + "\n" +
  "- EMAIL: " + req.webtaskContext.data.email + "\n" +
  "- AVAILABILITY (hs): " + req.webtaskContext.data.availability + "\n" +
  "- LOCATION: " + req.webtaskContext.data.location + "\n" +
  "- SKILL: " + req.webtaskContext.data.skill + "\n" +
  "- WEBSITE: " + req.webtaskContext.data.website + "\n" +
  "- LINKEDIN: " + req.webtaskContext.data.linkedin + "\n" +
  "- GITHUB: " + req.webtaskContext.data.github + "\n" +
  "- MESSAGE: \n" + req.webtaskContext.data.message;

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
