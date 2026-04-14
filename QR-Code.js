const express = require('express');

const qrCode = require('qrcode');
const path = require('path');


const app = express();
app.use(express.urlencoded({ extended: true}));

app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'index.html'));

});

app.post('/generate-qr', async (req,res)=>{
    try{
        const { text } = req.body;
        const QRCode = await qrCode.toDataURL(text);
        res.send(`


<div class="card">
  <h2>Your QR Code </h2>
  <img src="${QRCode}" />
  <br/>
  <a href="/">Generate Again</a>
</div>


`);
    }catch(err){
        console.log(err);
    }
});



app.listen(7123,(req,res)=>{

    console.log(" server is start");
});
