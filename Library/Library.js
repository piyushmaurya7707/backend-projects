const express = require("express");

const bodyParser = require("body-parser");

const app = express();

let books = [
    {
        bookName: "sdfjkasdfkl",
        bookPrice: 234,
        bookAuthor: "hsdisdjhf",
        bookStatus: "Available",
        bookPages: 200,

    }
];


app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {


    res.render('index', { data: books });


});

app.post("/", (req, res) => {
    const newbook =
    {
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,

        bookPrice: req.body.bookPrice,
        bookPages: req.body.bookPages,

        bookStatus: "Available"

    };

    books.push(newbook);
    res.render("index", { data: books });
});



app.post('/issue', (req, res) => {
    const reqBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === reqBookName) {
            book.bookStatus = "Issued";
        }


    });





    res.render('index', { data: books });

});

app.post('/return', (req, res) => {
    const reqBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === reqBookName) {
            book.bookStatus = "Available"

        }
    });
    res.render('index', { data: books });
    });
    app.post('/delete', (req, res) => {
        const reqBookName = req.body.bookName;


        books = books.filter(book => book.bookName !== reqBookName );

        res.render('index', { data: books });
    });


app.listen(6798, (req, res) => {

    console.log('App is running ');
})


