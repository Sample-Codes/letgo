var fs = require('fs');
var sqlite3 = require('sqlite3').verbose(),
    TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;

var db = new TransactionDatabase(new sqlite3.Database('letgo.db'));

// exports 
exports.clearTables=clearTables;
exports.registerUser=registerUser;
exports.deleteUser=deleteUser;
exports.loginUser=loginUser;
exports.postListing=postListing;
exports.updateListingPrice=updateListingPrice;
exports.updateListingDescription=updateListingDescription;
exports.updateListingLocation=updateListingLocation;
exports.updateListingPhoto=updateListingPhoto;
exports.removeListing=removeListing;
exports.getMySellList=getMySellList;
exports.getMyWatchList=getMyWatchList;
exports.addToWatchList=addToWatchList;
exports.removeFromWatchList=removeFromWatchList;

// Define objects
var user = {
    userid: '',
    name: '',
    location: '',
    email: ''
};
var listing = {
    listid: '',
    userid: '',
    description: '',
    price: '',
    category: '',
    status: '',
    location: '',
    imageFile: '',
    insertDt: ''
};
var watchedListing = {
    watchid: '',
    userid: '',
    listid: '',
    insertDt: ''
};
function createUserFrom(thisRow)
{
    var aUser = Object.create(user);
    aUser.userid = thisRow.USERID;
    aUser.name = thisRow.NAME;
    aUser.email = thisRow.EMAIL;
    aUser.location = thisRow.LOCATION;
    return aUser;
}
function createListingFrom(thisRow)
{
    var aListing = Object.create(listing);
    aUser.listid = thisRow.LISTID;
    aUser.userid = thisRow.USERID;
    aUser.description = thisRow.DESCRIPTION;
    aUser.price = thisRow.PRICE;
    aUser.category = thisRow.CATEGORY;
    aUser.status = thisRow.STATUS;
    aUser.location = thisRow.LOCATION;
    aUser.imageFile = thisRow.IMGFILE;
    aUser.insertDt = thisRow.INSERT_TS;
    return aUser;
}
function createWatchedListingFrom(thisRow)
{
    var aWatchedListing = Object.create(watchedListing);
    aWatchedListing.watchid = thisRow.WATCHID;
    aWatchedListing.userid = thisRow.USERID;
    aWatchedListing.listid = thisRow.LISTID;
    aWatchedListing.insertDt = thisRow.INSERT_TS;
}

function initDB()
{
    db.serialize(function () {
        console.log("create User table");
        db.run("CREATE TABLE IF NOT EXISTS users \
        (USERID INTEGER PRIMARY KEY NOT NULL, \
        NAME TEXT NOT NULL, \
        EMAIL TEXT UNIQUE NOT NULL,\
        LOCATION TEXT)", function (err) { if (err) { console.log(err); } });
    });
    db.serialize(function () {
        console.log("create listing table");
        db.run("CREATE TABLE IF NOT EXISTS listing \
        (LISTID INTEGER PRIMARY KEY NOT NULL, \
        USERID INT NOT NULL, \
        DESCRIPTION TEXT NOT NULL, \
        PRICE REAL NOT NULL, \
        CATEGORY TEXT NOT NULL, \
        STATUS TEXT NOT NULL, \
        LOCATION TEXT NOT NULL,\
        IMGFILE TEXT NOT NULL,\
        INSERT_TS DATETIME DEFAULT CURRENT_TIMESTAMP, \
        FOREIGN KEY (USERID) REFERENCES users(USERID))", function (err) { if (err) { console.log(err); } });
    });
    db.serialize(function () {
        console.log("create watchlist table");
        db.run("CREATE TABLE IF NOT EXISTS watchlist \
        (WATCHID INTEGER PRIMARY KEY NOT NULL, \
        LISTID INT NOT NULL, \
        USERID INT NOT NULL, \
        INSERT_TS DATETIME DEFAULT CURRENT_TIMESTAMP , \
        FOREIGN KEY (LISTID) REFERENCES listing(LISTID), \
        FOREIGN KEY (USERID) REFERENCES users(USERID))",
         function (err) { if (err) { console.log(err); } });
    });

}
function clearTables()
{
    db.run("DELETE from watchlist", function (err) { if (err) { } }); //x
    db.run("DELETE from listing", function (err) { if (err) { } }); //x
    db.run("DELETE from users", function (err) { if (err) { } });

}
function asMyQuote(input) {
    return '\'' + input + '\'';
}
function registerUser(name, email, location)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var values = asMyQuote(name) + ', ' + asMyQuote(email) + ', ' + asMyQuote(location);
            var insertCommand = "INSERT INTO users (NAME, EMAIL, LOCATION) VALUES (" + values + ")"
            db.run(insertCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });
        });
    });
    return p;
}
function deleteUser(userid)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "DELETE FROM users WHERE USERID=" + uid;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function loginUser(email)
{
   var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM users WHERE EMAIL = " + email;
            console.log(command);
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (row) => {
            // Process them.
            var outputData = {};

            for (thisRow of row) {
                var aUser = createUserFrom(thisRow);
                outputData[aUser.userid] = aUser;
                console.log('User:  ' + aUser.userid);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting user profile: ' + pk);
            return {};
        }
        );
    return p;
}
function postListing(userid, description, price, category, location, photo)
{
    var p = new Promise(function (resolve, reject) {
       db.serialize(function () {
            var values = userid + ', ' + asMyQuote(description) + ', ' + price + ', ' + asMyQuote(category) + ', ' + asMyQuote(location) + ', ' + asMyQuote(photo) + ', ' + asMyQuote("POSTED");
            var insertCommand = "INSERT INTO listing (USERID, DESCRIPTION, PRICE, CATEGORY, LOCATION, IMGFILE, STATUS) VALUES (" + values + ")"
            db.run(insertCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });
        });
    });
    return p;
}
function updateListingPrice(listid, price)
{   
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "UPDATE listing SET PRICE=" + price + " WHERE LISTID=" + listid;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function updateListingDescription(listid, description)
{   
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var qdescript = asMyQuote(description);
            var command = "UPDATE listing SET DESCRIPTION=" + qdescript + " WHERE LISTID=" + listid;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function updateListingLocation(listid, location)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var qValue = asMyQuote(location);
            var command = "UPDATE listing SET LOCATION=" + qValue + " WHERE LISTID=" + listid;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function updateListingPhoto(listid,photo)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "UPDATE listing SET IMGFILE=" + asMyQuote(photo) + " WHERE LISTID=" + listid;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function removeListing(listid)
{
    var p = new Promise(function (resolve, reject) {
       db.serialize(function () {

            var command = "DELETE FROM listing WHERE LISTID=" + listid;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;
}
function getMySellList(userid)  // returns a list of listing
{
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM listing WHERE USERID = " + userid;
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aListing = createListingFrom(thisRow);

                outputData[aListing.listid] = aListing;
                console.log('Listing#:  ' + aListing.listid);
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting my listing');
            return {};
        }
        );
    return p;
}
function getMyWatchList(userid)  // returns a list of listing
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(() => {
            var command = 'SELECT * FROM watchlist, listing where watchlist.LISTID = listing.LISTID and watchlist.USERID = ' + userid + ' ORDER BY watchlist.INSERT_TS DESC';

            console.log('About to run:  ' + command);
            db.all(command , (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = {};

            for (thisRow of rows) {
                var aListing = createListingFrom(thisRow);

                outputData[aListing.listid] = aListing;
                console.log('Listing#:  ' + aListing.listid);
            }
            return outputData;
        }
    );

    return p;    
}
function addToWatchList(listid, userid)
{
   var p = new Promise(function (resolve, reject) {
       db.serialize(function () {
            var values = listid + ', ' + userid;
            var insertCommand = "INSERT INTO watchlist (LISTID, USERID) VALUES (" + values + ")"
            db.run(insertCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });
        });
    });
    return p;
}
function removeFromWatchList(watchid)
{
    var p = new Promise(function (resolve, reject) {
       db.serialize(function () {

            var command = "DELETE FROM watchlist WHERE WATCHID=" + watchid;
            var stmt = db.prepare(command);
            stmt.run();
            if (err) {
                reject(err);
            }
            stmt.finalize();
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    return p;   
}
initDB(db);