const express = require('express');

const multer = require('multer');
const path = require('path');


const app = express();
app.use(express.static('public'));
const storage = multer.diskStorage({
   
  destination: (req,file,cb)=>{
     
        cb(null,'filestorage/');
  },
  filename: (req,file,cb)=>{
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null,fileName); 

  }
});

const upload = multer({ storage });

app.post('/upload',upload.single('uploadedfile') , (req,res)=>{
     res.send("File uploaded successfully");

});



app.get('/',(req,res)=>{

  res.send("Server is running");
});

app.listen(8756, (req,res)=>{
   
  console.log("your server is started on port 8756");

});

















