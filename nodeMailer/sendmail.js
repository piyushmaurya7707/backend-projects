const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const app =  express();

app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('index');

});

app.post('/send-email',(req,res)=>{
    const { recipient, subject , message } = req.body;

   const transport = nodemailer.createTransport({
         service:  'gmail',
         auth: {
            user: 'piyushsecondmail@gmail.com',
            pass:  'abc'
         }


   });
          
     const mailOption = {
        from: 'piyushsecondmail@gmail.com',
        to: recipient,
        subject: subject,
        text: message 
     };

     transport.sendMail(mailOption, (err)=>{
        if(err){
            console.log(err);
        }
     });

    

});

app.listen(8956,(req,res)=>{
    
    console.log('server is started');
});







