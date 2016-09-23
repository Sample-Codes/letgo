var express = require('express');
var app = express();
var db = require('./db.js');

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
    insertDt: '',
    listing: ''
};
var locs = ['Baltimore','Columbia','DC'];
var items = ['Picture Frame','TV','Car','Speed Boat','Guitar','DVDs'];
var prices = [5.0,45.00,750.00,650.00,100.00,2.00];
var usedNew = ['New ', 'Used ', 'Damaged ','Parts '];
var colors = ['White ', 'Black ', 'Red ','Blue '];
var userList = {};
var listings = {};

var maxUsers = 10;
var maxItems = 6;

function loadTables()
{
    db.clearTables();
    for (var i = 0; i < maxUsers; i++)
    {
        var newUser = Object.create(user);
        newUser.name = 'User'+i;
        newUser.email = 'user_email'+i + 'gmail.com';
        newUser.location = locs[i%3];
        userList[i] = newUser;
    } 
    for (var i = 0; i < maxUsers; i++)
    {
        (db.insertUser(userList[i].name, userList[i].email, userList[i].location)).then((pk) => {
            userList[i].userid = pk;
            printUser(userList[i]);
        }, (err) => {console.log("Insert error")});
    }
    var nextIdx = 0;
    for (var i = 0; i < maxUsers; i++)
    {
        var uid = i+1;
        var loc = userList[i].location;
        for (var x = 0; x < maxItems; x++)
        {
        var newList = Object.create(listing);
        newList.userid = uid;
        newList.description = usedNew[(uid + x)%4] + colors[(uid + x)%4] + items[x];
        newList.price = prices[x]+uid;
        newList.category = items[x];
        newList.status = 'POSTED';
        newList.location = loc;
        newList.imageFile = 'image.jpg';
        listing[nextIdx] = newList;
        nextIdx++;
        }
    }
    for (var i = 0; i < nextIdx; i++)
    {
        (db.insertListing(listing[i].userid, listing[i].description, listing[i].price, listing[i].category, listing[i].location, listing[i].photo)).then((pk) => {
            listing[i].listid = pk;
            printoutListing(listing[i]);
        }, (err) => {console.log("Insert error")});
    }
    var nextwid = 0;
    for (var i = 0; i <maxUsers; i++)
    {
        var uid = i+1;
        for (var x = 0; x < uid; x++)
        {
            var lidx = (Math.floor((Math.random())*100) % 60) + 1;

            (db.insertWatchList(uid, lidx)).then((pk) =>{

            }, (err) => { console.log("error inserting watch list")});
        }
        
    }
}  // end of loadTables
function printUser(user)
{
    console.log('userid: ' + user.userid + ' Name: ' + user.name + ' Email: ' + user.email + ' Location: ' + user.location);
}


function printoutListing(listing)
{
    console.log("ID: " + listing.listid + " Seller: " + listing.userid + " Price: " + listing.price);
    console.log(listing.description);
    
    console.log("Added: " +  listing.insertDt)
    console.log("Category: " + listing.category + " Status: " + listing.status + " Loc: " + listing.location);
    console.log("Image: " + listing.imageFile);
}
function printWatchListing(watched)
{
    console.log("Entry: " + watched.watchid +  " Item: " + watched.listid + " Watched By: " + watched.userid);
    printoutListing(watched.listing);
}

loadTables();
