var fs = require('fs');
var sqlite3 = require('sqlite3').verbose(),
    TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;

var db = new TransactionDatabase(new sqlite3.Database('letgo.db'));

function initDB()
{
    db.serialize(function () {
        console.log("create User table");
        db.run("CREATE TABLE IF NOT EXISTS users \
        (USERID INTEGER PRIMARY KEY NOT NULL, \
        NAME TEXT NOT NULL, \
        EMAIL TEXT NOT NULL,\
        LOCATION TEXT)", function (err) { if (err) { console.log(err); } });
    });
    db.serialize(function () {
        console.log("create listing table");
        db.run("CREATE TABLE IF NOT EXISTS listing \
        (LISTID INTEGER PRIMARY KEY NOT NULL, \
        USERID INT NOT NULL, \
        DESCRIPTION TEXT NOT NULL, \
        PRICE TEXT NOT NULL, \
        CATEGORY TEXT NOT NULL, \
        STATUS TEXT NOT NULL, \
        LOCATION TEXT NOT NULL,\
        INSERT_TS TEXT, \
        FOREIGN KEY (USERID) REFERENCES users(USERID))", function (err) { if (err) { console.log(err); } });
    });
    db.serialize(function () {
        console.log("create watchlist table");
        db.run("CREATE TABLE IF NOT EXISTS watchlist \
        (WATCHID INTEGER PRIMARY KEY NOT NULL, \
        LISTID INT NOT NULL, \
        USERID INT NOT NULL, \
        INSERT_TS TEXT, \
        FOREIGN KEY (LISTID) REFERENCES listing(LISTID), \
        FOREIGN KEY (USERID) REFERENCES users(USERID))",
         function (err) { if (err) { console.log(err); } });
    });

}

initDB(db);