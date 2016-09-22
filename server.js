var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./db'),
    path = require('path')

var multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path');

var fs = require('fs-extra');


app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname+"/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(app.router);

app.get('/getUser/:userName', function (req, res) {
    console.log('Body: ' + req.body.userName)
    console.log('Params: ' + req.params.userName)

    var login = {
        email: req.params.userName,
    };

    var p = db.getUser(login.email);
    p.then(
        (val) => {
            console.log('User Id: ' + val.userid)
            res.send(val);
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
            console.log(val)
            res.send('User Added');
            //res.send(val.UserId);
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

    var listing = {
        email: req.body.email,
        userId: req.body.userId,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        location: req.body.location,
        photo: req.file.filename
        //photo: req.body.photo
    };

    var insertListing = db.insertListing(listing.userId, listing.description, listing.price, listing.category, listing.location, listing.photo);

    insertListing.then((val) => {
        // fs.rename(file.filePath + '/' + file.fileName, file.filePath + '/' + val.LastId, function (err) {
        // if (err) return console.error(err)

        // })
        res.send('Listing for ' + listing.userId + ' is added successfully!');
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
        res.send('WatchList Id for Listing' + listing.listId + ' is added successfully!');
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
        location: req.body.listinglocation,
        status: req.body.status,
        postedBy: req.body.postedBy
    };

    var listings = db.getAllListings();

    listings.then(
        (val) => {
            console.dir('first list: ' + val[5].listid);
            res.send(val);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('Issue getting Listings');
        }
    );
})

app.get('/getMyListings/:userId', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.params.userId
    };

    var listing = {
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        status: req.body.status,
        postedBy: req.body.postedBy
    };

    var listing = db.getMySellList(user.userId);

    listing.then(
        (val) => {
            console.dir(val);
            res.send(val);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('Issue getting My Listings');
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
        status: req.body.status,
        photo: req.file.filename
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

app.post('/updateListingPrice/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        listId: req.body.listId,
        price: req.body.price
    };

    var updateListingPrice = db.updateListingPrice(listing.listId, listing.price);
    //var updateListing = db.updateListing(user.userId, listing.listId, listing.price);

    updateListingPrice.then((val) => {
        res.send('Price for Listing Id ' + listing.listId + ' is updated successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

});

app.post('/updateListingDescription/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        listId: req.body.listId,
        description: req.body.description
    };

    var updateListing = db.updateListing(listing.listId, listing.description);
    //var updateListing = db.updateListing(user.userId, listing.listId, listing.description);

    updateListing.then((val) => {
        res.send('Description for Listing Id ' + listing.listId + ' is updated successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

});

app.post('/updateListingLocation/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        listId: req.body.listId,
        location: req.body.listinglocation
    };

    var updateListing = db.updateListing(listing.listId, listing.location);
    //var updateListing = db.updateListing(user.userId, listing.listId, listing.description);

    updateListing.then((val) => {
        res.send('Location for Listing Id ' + listing.listId + ' is updated successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

});

app.post('/updateListingPhoto/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        listId: req.body.listId,
        photo: req.file.filename
    };

    var updateListing = db.updateListing(listing.listId, listing.photo);
    //var updateListing = db.updateListing(user.userId, listing.listId, listing.description);

    updateListing.then((val) => {
        res.send('Photo for Listing Id ' + listing.listId + ' is updated successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

});

app.post('/deleteUser/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var deleteUser = db.deleteUser(user.userId);

    deleteUser.then((val) => {
        res.send('User is deleted successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

})

app.post('/deleteListing/', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.body.userId
    };

    var listing = {
        listId: req.body.listId,
    };

    var deletListing = db.deleteListing(listing.listId);
    //var deletListing = db.removeListing(user.userId, listing.listId);

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

    var watchListing = {
        watchId: req.body.watchId,
    };

    var clearWatchListItem = db.removeFromWatchList(user.userId, watchlisting.watchId);

    clearWatchListItem.then((val) => {
        res.send('Watch Listing is deleted successfully!');
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