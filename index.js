const serverless = require('serverless-http');
var bodyParser = require('body-parser');
const express = require('express');
const mailer = require('./utils/mailer');
var cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
    console.log("this is the key",process.env.SENDGRID_API_KEY)
    res.send('Hello World!');
})

app.post('/api/send_email', function (req, res) {
    const data = req.body;
    console.log("this is the request body", req.body);
    mailer(data.message, data.recipient, data.subject).then(() => {
        console.log('success')
        res.send({...req.body,message: "success"});
    }).catch((error) => {
        console.log('failed', error)
        res.send({message: "failed"})
    });
})

module.exports.handler = serverless(app);