var app = new(require('express'));
var Webtask = require('webtask-tools');

app.use(require('body-parser').json());


// POST testing...

app.post('/mailer/test', function (req, res) {
  res.status(200).send(req.webtaskContext.data);
});

app.post('/mailer/echo', function (req, res) {
  res.status(200).send(req.body);
});

// [POST] hire

app.post('/mailer/hire', function (req, res) {

    var content = "- ORGANIZATION:" + req.body.org + "\n" + "- MESSAGE: \n" + req.body.message;

    var Sendgrid = require('sendgrid')(req.webtaskContext.data.SG_KEY);

    Sendgrid.send({
        to: req.webtaskContext.data.SG_TO,
        from: req.webtaskContext.data.SG_FROM,
        subject: 'New HIRE Message from ' + req.body.name + ' <' + req.body.email +'>',
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

    var content = "- NAME:" + req.params.name + "\n" +
                  "- EMAIL: " + req.params.email + "\n" +
                  "- AVAILABILITY (hs): " + req.params.availability + "\n" +
                  "- LOCATION: " + req.params.location + "\n" +
                  "- SKILL: " + req.params.skill + "\n" +
                  "- WEBSITE: " + req.params.website + "\n" +
                  "- LINKEDIN: " + req.params.linkedin + "\n" +
                  "- GITHUB: " + req.params.github + "\n" +
                  "- MESSAGE: \n" + req.params.message;

    var Sendgrid = require('sendgrid')(req.webtaskContext.data.SG_KEY);

    Sendgrid.send({
        to: req.webtaskContext.data.SG_TO,
        from: req.webtaskContext.data.SG_FROM
        subject: 'New JOIN Message from ' + req.params.name + ' <' + req.params.email +'>',
        text: content
    }, function(err, json) {
        if(err)
          res.status(500).send(err);
        else
          res.status(200).send("ok");;
    });
})


module.exports = Webtask.fromExpress(app);
