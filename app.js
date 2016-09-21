var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

var fs = require('fs');
var mime = require('mime');

app.use(express.static('html'));
app.use(express.static('css'));
app.use(express.static('img'));
app.use(cookieParser());

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var multer  = require('multer');

app.get('/', function (req, res) {
    res.redirect('/index.html');

});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});