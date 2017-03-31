var Express = require('express');
var Webtask = require('webtask-tools');
var app = Express();

app.use(require('body-parser').json());

// POST [hire]
app.post('/mailer/hire', function (req, res) {
    if((!req.params.SG_KEY) ||
       (!req.params.SG_TO)  ||
       (!req.params.SG_FROM))
          res.json({ status: 500 });

    var content = "- ORGANIZATION:" + req.params.org + "\n" + "- MESSAGE: \n" + req.params.message;

    var Sendgrid = require('sendgrid')(req.params.SG_KEY);

    Sendgrid.send({
        to: req.params.SG_TO,
        from: req.params.SG_FROM,
        subject: 'New HIRE Message from ' + req.params.name + ' <' + req.params.email +'>',
        text: content
    }, function(err, json) {
        if(err)
          res.json({ status: 500 });
        else
          res.json({ status: 200 });
    });
});

// POST [hire]
app.post('/mailer/join', function (req, res) {
    if((!req.params.SG_KEY) ||
       (!req.params.SG_TO)  ||
       (!req.params.SG_FROM))
          res.json({ status: 500 });

    var content = "- NAME:" + req.params.name + "\n" +
                  "- EMAIL: " + req.params.email + "\n" +
                  "- AVAILABILITY (hs): " + req.params.availability + "\n" +
                  "- LOCATION: " + req.params.location + "\n" +
                  "- SKILL: " + req.params.skill + "\n" +
                  "- WEBSITE: " + req.params.website + "\n" +
                  "- LINKEDIN: " + req.params.linkedin + "\n" +
                  "- GITHUB: " + req.params.github + "\n" +
                  "- MESSAGE: \n" + req.params.message;

    var Sendgrid = require('sendgrid')(req.param.SG_KEY);

    Sendgrid.send({
        to: req.param.SG_TO,
        from: req.param.SG_FROM,
        subject: 'New JOIN Message from ' + req.params.name + ' <' + req.params.email +'>',
        text: content
    }, function(err, json) {
        if(err)
          res.json({ status: 500 });
        else
          res.json({ status: 200 });
    });
})
