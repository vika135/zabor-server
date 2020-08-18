const express = require("express");
require('dotenv').config(); //для того чтобы брать переменные среды из .env файла

const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY); //секретный апи ключ

const app = express();

const ALLOWED_ORIGINS = [
    'http://127.0.0.1:5500',
    'https://vika135.github.io',
    'http://j17.liderpoiska.ru'
  ]

app.set('trust proxy', true);

const jsonParser = express.json();
let to, subject, text;

app.get("/", function(request, response){
    response.send("<h2>hello it's mail sending service</h2>");
});

app.options('*', (req, res) => {
  if(ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
    res.set('Access-Control-Allow-Origin', req.headers.origin); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.send('ok');
  }
});

app.post("/sendmail", jsonParser, function (request, response) {
  if(ALLOWED_ORIGINS.indexOf(request.headers.origin) > -1) {
    response.set('Access-Control-Allow-Origin', request.headers.origin);
    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
  }

    console.log(request.body);
    if(!request.body) return response.sendStatus(400);  
    to = request.body.to;
    subject = request.body.subject;
    text = request.body.text;
    response.json(request.body);
    sendgridSengEmail().catch(console.error);
});


async function sendgridSengEmail() {
  await sendgrid.send({
    to: to,
    from: 'from_email@example.com',
    subject: subject,
    text: text,
  });
}

  //send().catch(console.error);
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });