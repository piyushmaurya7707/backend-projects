const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {


    res.render('index', { email: "" });
});

let otpStroage = {};
app.post('/send-otp', (req, res) => {

    const { email } = req.body;

    const generateOTP = Math.floor(100000 + Math.random() * 900000);


    otpStroage[email] = generateOTP;
    const transporter = nodemailer.createTransport({

        service: 'gmail',
        secure: true,
        auth: {
            user: 'piyushsecondmail@gmail.com',
            pass: 'abc'
        }


    });
    const mailOption = {
        from: 'piyushsecondmail@gmail.com',
        to: email,
        subject: 'hello',
        text:`OTP = ${generateOTP}`

    }

    transporter.sendMail(mailOption, (err, info) => {

        if (err) {
            console.log(err);
            res.send('error');

        }



        else {
            res.render('verify', { email });
        };

    });

});





app.post('/verify', (req, res) => {
    const { email, otp } = req.body;

    if (otpStroage[email] == otp) {
        delete otpStroage[email];

        res.send('✅ OTP Verified Successfully');
    }
    else {
        res.send('❌ Invalid OTP ');
    }
});



app.listen(4719, (req, res) => {

    console.log('server is started');
});













