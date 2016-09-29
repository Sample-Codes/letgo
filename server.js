var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./db'),
    path = require('path')

var multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path');

var fs = require('fs-extra');

app.use('/static', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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

app.get('/getPhotos/:listid', function(req, res) {
    console.log('listid: ' + req.params.listid);

    var listid = req.params.listid;
    var p = db.getListingPhotos(listid);
    p.then(
        (val) => {
            console.log('Photos: ', val);
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

app.get('/getLogin/:userName/:password', function (req, res) {
    console.log('Body: ' + req.body.userName)
    console.log('userName: ' + req.params.userName)
    console.log('password: ' + req.params.password)

    var login = {
        email: req.params.userName,
        password: req.params.password
    };

    var p = db.getUser(login.email, login.password);
    p.then(
        (val) => {

            if (login.email === val.email & login.password === val.password){
            res.send(val);
            }
            else {
            res.send('Invalid Login');    
            }
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

    console.log('insert user body email:' + req.body.email)
    console.log('insert user body password:' + req.body.password)
    console.log('insert user body name:' + req.body.name)
    console.log('insert user body:' + req.body.location)

    var user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        location: req.body.location
    };

    var p = db.insertUser(user.name, user.email, user.location, user.password);
    p.then(
        (userid) => {
            //res.send('User Added');
            res.send({userid});
        }
    ).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )
});

app.post('/insertListing/', multer({dest: './public/photos/'}).single('file'), function (req, res) {

    console.log('Req')
    console.dir(req)
    console.log('file')
    console.dir(req.file)

	console.log('Body userid: ' + req.body.userId); 
	console.log('Body description: ' + req.body.description); 
	console.log('Body category: ' + req.body.category); 
    console.log('Body price: ' + req.body.price); 
	//console.log('Body photo: ' + req.body.photo); 
    console.log('File photo: ' + req.file.filename); 
	console.log('Body location: ' + req.body.location);     
	//console.log('File: ' + req.file);

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

    insertListing.then((listid) => {
        // fs.rename(file.filePath + '/' + file.fileName, file.filePath + '/' + val.LastId, function (err) {
        // if (err) return console.error(err)

        // })
        //res.send('Listing for ' + listing.userId + ' is added successfully!');
        res.send({listid});
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    );

});

app.post('/insertWatchList/:userId/:listId', function (req, res) {

    var user = {
        email: req.body.email,
        userId: req.params.userId
    };

    var listing = {
        listId: req.params.listId,
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

    var listings = db.getAllListings();

    listings.then(
        (val) => {
            console.log('first list: ' + val[0].listid);
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

    var listing = db.getSellList(user.userId);

    listing.then(
        (val) => {
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

console.log('getwatchlist: ' + req.params.userId); 

    var user = {
        email: req.body.email,
        userId: req.params.userId
    };

    console.log('getwatchlist2: ' + user.userId); 

    var watchList = db.getWatchList(user.userId);

    watchList.then(
        (val) => {
            console.log('watch list first list: ' + val[0].listid);
            res.send(val);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('Issue getting WatchList');
        }
    );
})

app.get('/getWatchersForListing/:listId', function (req, res) {

    var listing = {
        listId: req.params.listId
    };

    var watchersForListing = db.getWatchersForListing(listing.listId);

    watchersForListing.then(
        (val) => {
            console.log('watcher list first list: ' + val[0].listid);
            res.send(val);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('Issue getting WatchList');
        }
    );
})

app.post('/updateListing/', multer({dest: './public/photos/'}).single('file'), function (req, res) {

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

    var listing = {
        userId: req.body.userId,
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
        userId: req.body.userId
    };

    var deleteEntireWatchList = db.deleteEntireWatchList(user.userId);

    deleteEntireWatchList.then((val) => {
        res.send('Entire Watch List is deleted successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

});

app.post('/deleteWatchList/:userId/:listId', function (req, res) {

    var watchlist = {
        watchId: req.body.watchId,
        listId: req.params.listId,
        userId: req.params.userId
    };

    var deleteWatchList = db.deleteWatchList(watchlist.userId, watchlist.listId);

    deleteWatchList.then((val) => {
        res.send('Watch Listing is deleted successfully!');
    }).catch(
        (err) => {
            console.log(err);
            res.send(err);
        }
    )

});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});