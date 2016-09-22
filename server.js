var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./db'),
    path = require('path')

var multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path');

var fs = require('fs-extra');


// app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login/:UserName', function (req, res) {
    var login = {
        email: req.params.UserName,
    };

    var p = db.getUser(login.email);
    p.then(
        (val) => {

            if (login.email === val.Email) {
                res.send(val.UserId);
            } else {
                throw 'No user found!';
            }
            res.redirect('/');
        }
    ).catch(
        (err) => {
            res.status(500);
            console.log(err);
            res.send(err);
        }
    )
});

app.post('/insertUser/', function (req, res) {
    var user = {
        email: req.body.email,
        name: req.body.name,
        location: req.body.location
    };

    var p = db.insertUser(user.name, user.email, user.location);
    p.then(
        (val) => {
            res.send(val.UserId);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )
});

app.post('/insertListing/', multer({dest: './public/photos/'}).single('photo'), function (req, res) {

	console.log('Body: ' + req.body); 
	console.log('File: ' + req.file);

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        location: req.body.listinglocation,
        actualFileName: req.file.originalname,
        fileName: req.file.filename,
        filePath: req.file.path
    };


    var insertListing = db.insertListing(user.userId, listing.actualFileName, listing.systemFileName);


    insertListing.then((val) => {
        fs.rename(file.filePath + '/' + file.fileName, file.filePath + '/' + val.LastId, function (err) {
        if (err) return console.error(err)

        })
        res.send('Listing for ' + user.userId + ' is added successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    );

});

app.post('/insertWatchList/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        listId: req.body.listId,
    };

    var insertWatchList = db.insertWatchList(user.userId, listing.listId);

    insertWatchList.then((val) => {
        res.send('WatchList Id ' + val.LastId + ' for Listing' + listing.listId + ' is added successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

});

app.get('/getListings/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        status: req.body.status,
        postedBy: req.body.postedBy
    };

    var listing = db.getListing(listing);

    listing.then(
        (val) => {
            console.dir(val);
            res.send(val);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('Issue getting WatchList');
        }
    );
})

app.get('/getWatchList/:userId', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.param.userId
    };

    var watchList = db.getWatchList(user.userId);

    watchList.then(
        (val) => {
            console.dir(val);
            res.send(val);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('Issue getting WatchList');
        }
    );
})

app.post('/updateListing/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        listId: req.body.listId,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        location: req.body.listinglocation,
        status: req.body.status
    };

    var updateListing = db.updateListing(user.userId, listing.listId, listing.description, listing.price, listing.category, listing.location, listing.status);

    updateListing.then((val) => {
        res.send('Listing Id ' + listing.listId + ' is updated successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

});

app.post('/deleteListing/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        listId: req.body.listId,
    };

    var deletListing = db.deleteListingRecord(user.userId, listing.listId);

    deleteListing.then((val) => {
        res.send('Listing is deleted successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

})

app.post('/deleteEntireWatchList/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var clearWatchList = db.deleteEntireWatchList(user.userId);

    clearWatchList.then((val) => {
        res.send('Entire Watch List is deleted successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

});

app.post('/deleteWatchListListing/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        listId: req.body.listId,
    };

    var clearWatchListItem = db.deleteWatchListRecord(user.userId, listing.listId);

    clearWatchListItem.then((val) => {
        res.send('Entire Watch List is deleted successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

})


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});