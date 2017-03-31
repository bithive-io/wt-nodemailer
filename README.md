# Webtask and Sendgrid

"Hacking" with Webtask and Sendgrid.
Since I was needing a small "backend" for sending emails from my static website without exposing any API Key or Secret,
WT was a perfect solution, creating a task parametrized with secret (encoded) params.
I did something similar before with AWS Lambda and Python, but was even more straightforward with WT.
At the beginning I was considering usage of Nodemailer module with AWS SES, but I found out that just Sendgrid can be required
inside some WT code [canirequire](https://tehsis.github.io/webtaskio-canirequire/).

I just integrated in the Contact form of my own company's website: [bithive](http://bithive.io).


### Usage

```bash
wt create https://raw.githubusercontent.com/bithive-io/wt-sendgrid/master/wt-mailer.js \
        --name wt-bithive-web \
        --no-parse \
        --no-merge \
        --secret SG_KEY=${Sendgrid API KEY} \
        --secret SG_TO=${To email address} \
        --secret SG_FROM=noreply@contact.bithive.io
```


### Improvements

Some improvements I will take a look later on is integration of Recaptcha in order to avoid abuse or control limits.
