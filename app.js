const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const ALLOWED_ORIGINS = [
    'http://127.0.0.1:5500'
  ]

const jsonParser = express.json();
let to, subject, text;

app.get("/", function(request, response){
    response.send("<h2>hello</h2>");
});

app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.send('ok');
});

app.post("/sendmail", jsonParser, function (request, response) {
    response.set('Access-Control-Allow-Origin', "http://127.0.0.1:5500");
    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');

    console.log(request.body);
    if(!request.body) return response.sendStatus(400);  
    to = request.body.to;
    subject = request.body.subject;
    text = request.body.text;
    //response.json(request.body); // отправляем пришедший ответ обратно
    response.json(request.body);
    send().catch(console.error);
});

async function send() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '[ДАННЫЕ УДАЛЕНЫ]',
            pass: '[ДАННЫЕ УДАЛЕНЫ]'
          }
        });    
      let info = await transporter.sendMail({
      from: '<vikadelivery@gmail.com>', 
      to: to, 
      subject: subject, 
      text: text, 
    })
    console.log("Message sent: %s", info.messageId)
  }
  
  //send().catch(console.error);
  app.listen(3000);