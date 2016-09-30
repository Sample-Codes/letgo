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
var userList = [];
var listings = [];
var photos = [];
var maxUsers = 10;
var maxItems = 6;

function loadTables()
{
    db.clearTables();
 /********************************************************************
 *  This section inserts 10 users
 *********************************************************************/
    for (var i = 0; i < maxUsers; i++)
    {
        var newUser = Object.create(user);
        newUser.name = 'User'+i;
        newUser.email = 'user_email'+i + '@gmail.com';
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

 /********************************************************************
 *  This section inserts 6 listings for each user for a total of 60 listings
 *********************************************************************/
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
        var img = (nextIdx + 1) +'image.jpg';
        console.log(img);
        newList.imageFile = img;
        printoutListing(newList);
        listing[nextIdx] = newList;
        nextIdx++;
       }
    }
    for (var i = 0; i < nextIdx; i++)
    {
        (db.insertListing(listing[i].userid, listing[i].description, listing[i].price, listing[i].category, listing[i].location, listing[i].imageFile)).then((pk) => {
            listing[i].listid = pk;
            printoutListing(listing[i]);
        }, (err) => {console.log("Insert error")});
    }
 /********************************************************************
 *  This section inserts 1 to 10 watched listings for each user
 *  
 *********************************************************************/
var watchlist = [];
    watchlist[0] = [10,20,30,40,50,60]; //uid 1 exclude 1-6
    watchlist[1] = [1,21,31,41,51]; //uid 2 exclude  7-12
    watchlist[2] = [2,4,8,32]; //uid 3 exclude  13-18
    watchlist[3] = [3,6,9,12,15,18,27,30,33,36,]; //uid 4 exclude 19-24
    watchlist[4] = [4,8,12,16,20,24,32,36,40,44,48,52,56,60]; //uid 5 exclude 25-30
    watchlist[5] = [5,10,15,20,25,30,40,45,50,55,60]; //uid 6 exclude 31-36
    watchlist[6] = [6,12,18,24,30,48,54,60]; //uid 7 exclude 37-42
    watchlist[7] = [7,14,21,28,35,42,49,56]; //uid 8 exclude 43-48
    watchlist[8] = [8,16,24,32,40,48,56]; //uid 9 exclude 49-54
    watchlist[9] = [9,18,27,36,45,54]; //uid 10 exclude 55-60

   
    var nextwid = 0;
    for (var i = 0; i <maxUsers; i++)
    {
        var uid = i+1;
        var list = watchlist[i];
        for (var x = 0; x < list.length; x++)
        {

            (db.insertWatchList(uid, list[x])).then( (pk) => {
          
                }, (err) => {
                    var errStr = "PDB-" + err;
                    if (errStr.search("UNIQUE constraint failed:") >= 0)
                    {
                        console.log("Duplicate Entry ");
                    }
                    else
                    {
                        console.log("error inserting watch list")
                    }
            });
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
