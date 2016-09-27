
var fs = require('fs');
var db = require('../db.js');

var mocha = require('mocha');
var promise = require('chai-as-promised').promise;
//var promise = require('chai').promise;
var assert = require('chai').assert;

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
var user1 = Object.create(user);
user1.name = 'Inigo Montoya';
user1.email = 'Inigo@PrincessBride.com';
user1.location = 'Baltimore';
var user2 = Object.create(user);
user2.name = 'Fessig d\'Giant';
user2.email = 'Fessig@PrincessBride.com';
user2.location = 'Columbia';
var list1 = Object.create(listing);
list1.description = 'Nice painting by Leonard O Davinci';
list1.price = 20.00;
list1.category = 'Art';
list1.status = 'POSTED';



describe('Database', function () {

  describe('insertUser()', function () {
    // name, email, location
    it('Test the ability to insert a user', function () {

      (db.insertUser(user1.name, user1.email, user1.location)).then(function (pk) {
        console.log(pk);
        user1.userid = pk;
        expect(pk).to.above(0);
        done();
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('test duplicate insert', function () {

      (db.insertUser(user1.name, user1.email, user1.location)).then(function (pk) {
        console.log(pk);
        console.log('success is failure');
        assert.isTrue(false, 'success is failure');
        done();
      }, function (error) {
        console.log('failure is a success');
        assert.isTrue(true, 'failure is a success');
        done();
      });
    });
    it('test Missing email', function () {

      (db.insertUser(user1.name, null, user1.location)).then(function (pk) {
        console.log(pk);
        console.log('success is failure');
        assert.isTrue(false, 'success is failure');
        done();
      }, function (error) {
        console.log('failure is a success');
        assert.isTrue(true, 'failure is a success');
        done();
      });
    });
  });
  describe('Retrieve User()', function () {
    it('Test the retrieve a user profile', function () {

      (db.getUser(user1.email)).then(function (user) {
        console.log(user);
        expect(user).to.not.be.null;
        if (user != null) {
          expect(user.userid).to.not.be.null;
          expect(user.name).to.not.be.null;
          expect(user.email).to.not.be.null;
          expect(user.location).to.not.be.null;
        }
        else {
          console.log("User not found");
        }
        done();
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('Test the retrieve a unknown user profile', function () {

      (db.getUser(user2.email)).then(function (user) {
        expect(user).to.be.null;
        if (user != null) {
          expect(user.userid).to.not.be.null;
          expect(user.name).to.not.be.null;
          expect(user.email).to.not.be.null;
          expect(user.location).to.not.be.null;
        }
        else {
          console.log("User not found");
        }
        done();
      }, function (error) {
        assert.fail(error);
        done();
      });
    });

  });
  describe('Test Listings()', function () {
    // name, email, location
    it('Test the ability to insert a user', function () {

      (db.insertListing(user1.userid, list1.description, list1.price, list1.category, user1.location, null)).then(function (data) {
        console.log(data);
        list1.listid = data;
        expect(data).to.above(0);
        done();
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('Update listing(all)', function () {
      list1.price = 25.65;
      list1.photo = 'photo1.jpg';
      (db.updateListing(user1.userid, list1.listid, list1.description, list1.price, list1.category, list1.status, list1.location, list1.photo)).then(function () {
        console.log(list1);
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('Update listing(Price)', function () {
      list1.price = 2565.99;

      (db.updateListingPrice(user1.userid, list1.listid, list1.price)).then(function () {
        console.log(list1);
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('Update listing(Description)', function () {
      list1.description = 'The moaning lisa';
      list1.photo = 'photo1.jpg';
      (db.updateListing(user1.userid, list1.listid, list1.description)).then(function () {
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('Update listing(Photo)', function () {
      list1.photo = 'photo2.jpg';
      (db.updateListing(user1.userid, list1.listid, list1.photo)).then(function () {
        console.log(list1);
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });

    it('Update listing(Status)', function () {
      list1.status = 'pending';

      (db.updateListing(user1.userid, list1.listid, list1.status)).then(function () {
        console.log(list1);
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('Update listing(Location)', function () {
      list1.location = 'DC';

      (db.updateListingLocation(user1.userid, list1.listid, list1.location)).then(function () {
         console.log(list1);
       assert.isTrue(true, 'Listing updated');
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
  });
  describe('Test listing retrieval', function () {
    it('retrieve listings', function () {
      (db.getAllListings()).then(function (list) {
        console.log(list);
        expect(list).to.have.length.above(0);
        assert(list[0].listid).equal(1);
      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });

    it('retrieve select listings(userid)', function () {
      var srchListing = Object.create(listing);
      srchListing.userid = 1;
      (db.getListings(srchListing)).then(function (list) {
         console.log(list);
       expect(list).length.equal(7);

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('retrieve select listings(listid)', function () {
      var srchListing = Object.create(listing);
      srchListing.listid = 1;
      (db.getListings(srchListing)).then(function (list) {
         console.log(list);
       expect(list).length.equal(7);

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('retrieve select listings(category)', function () {
      var srchListing = Object.create(listing);
      srchListing.category = 'Car';
      (db.getListings(srchListing)).then(function (list) {
        console.log(list);
        expect(list).length.equal(7);

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('retrieve select listings(category,location)', function () {
      var srchListing = Object.create(listing);
      srchListing.category = 'Car';
      srchListing.location = 'Baltimore';
      (db.getListings(srchListing)).then(function (list) {
        console.log(list);
        assert(list.length > 0);
        assert(list.length == 7, 'Seven rows');

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('retrieve select a users sell list(userid)', function () {
      var srchListing = Object.create(listing);
      (db.getSellList(1)).then(function (list) {
        console.log(list);
        assert(list.length > 0);
        assert(list.length == 7, 'Seven rows');

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
  });
  describe('Test watchlist functions', function () {
    it('retrieve a users watch list(userid)', function () {
      (db.getWatchList(1)).then(function (list) {
        console.log(list);
        assert(list.length > 0);
        assert(list.length == 1, 'One rows');

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('add a listing to a users watch list(userid, listid)', function () {
      (db.insertWatchList(1, 10)).then(function (list) {
        console.log(list);
        assert(list.length > 0);
        assert(list.length == 1, 'One rows');

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('add a list of users watchinng a listing(listid)', function () {
      (db.getWatchersForListing(10)).then(function (list) {
        console.log(list);
        assert(list.length > 0);
        assert(list.length == 1, 'One rows');

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
  });
  describe('Test delete functions', function () {
    it('Delete an item from the watchlist(userid, listid)', function () {
      (db.deleteWatchList(1, 10)).then(function () {
        console.log('deleted');
        assert(list.length > 0);
        assert(list.length == 1, 'One rows');

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('Delete a listing deletes watchlist too(listid)', function () {
      (db.deleteListing(2,11)).then(function () {
        console.log('deleted');
        assert(list.length > 0);
        assert(list.length == 1, 'One rows');

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('Delete a user deletes listing, watchlist too(listid)', function () {
      (db.deleteUser(2)).then(function () {
        console.log('deleted');
        assert(list.length > 0);
        assert(list.length == 1, 'One rows');

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
    it('Delete a users watchlist too(listid)', function () {
      (db.deleteEntireWatchList(3)).then(function () {
        console.log('Success');
        assert(list.length > 0);
        assert(list.length == 1, 'One rows');

      }, function (error) {
        console.log(error);
        assert.fail(error);
        done();
      });
    });
  });

});
