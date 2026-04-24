require("dotenv").config();
const express = require('express');
const app = express();

const client = require('twilio')(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
);

app.get('/call', (req, res) => {

    const delay = 10000; // 10 sec

    setTimeout(async () => {
        try {
            await client.calls.create({
                twiml: "<Response><Say>hello thank you </Say></Response>",
                to: '+91123',
                from: process.env.TWILIO_PHONE 
            });

            console.log(' Call done');
        } catch (err) {
            console.log(err.message);
        }
    }, delay);

    res.send(' Call will happen in 10 seconds');
});

app.listen(7656, () => console.log("Server started"));