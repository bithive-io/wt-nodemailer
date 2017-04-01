var app = new(require('express'));
var Webtask = require('webtask-tools');

app.use(require('body-parser').json());

// [POST] hire
app.post('/mailer/hire', function (req, res) {

  var subject = 'New HIRE Message for Bithive';
  var content = '- NAME: ' + req.body.name +
                '- EMAIL: ' + req.body.email +
                '- ORGANIZATION: ' + req.body.org  +
                '- MESSAGE: ' + req.body.message;

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

  var subject = 'New JOIN Message for Bithive';
  var content = "- NAME:" + req.body.name +
                "- EMAIL: " + req.body.email  +
                "- AVAILABILITY (hs): " + req.body.availability +
                "- LOCATION: " + req.body.location +
                "- SKILL: " + req.body.skill  +
                "- WEBSITE: " + req.body.website +
                "- LINKEDIN: " + req.body.linkedin +
                "- GITHUB: " + req.body.github +
                "- MESSAGE: " + req.body.message;

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
