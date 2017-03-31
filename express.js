var Express = require('express');
var Webtask = require('webtask-tools');
var app = Express();

app.use(require('body-parser').json());

// POST [hire]
app.post('/mailer/hire', function (req, res) {
    if((!req.webtaskContext.data.SG_KEY) ||
       (!req.webtaskContext.data.SG_TO)  ||
       (!req.webtaskContext.data.SG_FROM))
         res.status(500).send("error");

    var content = "- ORGANIZATION:" + req.params.org + "\n" + "- MESSAGE: \n" + req.params.message;

    var Sendgrid = require('sendgrid')(req.params.SG_KEY);

    Sendgrid.send({
        to: req.webtaskContext.data.SG_TO,
        from: req.webtaskContext.data.SG_FROM,
        subject: 'New HIRE Message from ' + req.params.name + ' <' + req.params.email +'>',
        text: content
    }, function(err, json) {
        if(err)
          res.status(500).send("error");
        else
          res.status(200).send("ok");
    });
});

// POST [hire]
app.post('/mailer/join', function (req, res) {
    if((!req.webtaskContext.data.SG_KEY) ||
       (!req.webtaskContext.data.SG_TO)  ||
       (!req.webtaskContext.data.SG_FROM))
         res.status(500).send("error");

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
        to: req.webtaskContext.data.SG_TO,
        from: req.webtaskContext.data.SG_FROM
        subject: 'New JOIN Message from ' + req.params.name + ' <' + req.params.email +'>',
        text: content
    }, function(err, json) {
        if(err)
          res.status(500).send("error");
        else
          res.status(200).send("ok");;
    });
})


module.exports = Webtask.fromExpress(app);
