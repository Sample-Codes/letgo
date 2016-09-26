
var fs = require('fs');
var db = require('../db.js');

var mocha = require('mocha');
var promise = require('chai').promise;
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

      (db.insertUser(user1.name, user1.email, user1.location)).then(function (data) {
        user1.userid = data;
        expect(data).to.above(0);
        done();
      }, function (error) {
        assert.fail(error);
        done();
      });
    });
    it('test duplicate insert', function () {

      (db.insertUser(user1.name, user1.email, user1.location)).then(function (data) {
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

      (db.insertUser(user1.name, null, user1.location)).then(function (data) {
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
        list1.listid = data;
        expect(data).to.above(0);
        done();
      }, function (error) {
        assert.fail(error);
        done();
      });
    });
    it('Update listing(all)', function () {
      list1.price = 25.65;
      list1.photo = 'photo1.jpg';
      (db.updateListing(user1.userid, list1.listid, list1.description, list1.price, list1.category, list1.status, list1.location, list1.photo)).then(function () {
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
          assert.fail(error);
          done();
        });
    });
    it('Update listing(Price)', function () {
      list1.price = 2565.99;

      (db.updateListingPrice(user1.userid, list1.listid, list1.price)).then(function () {
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
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
          assert.fail(error);
          done();
        });
    });
    it('Update listing(Photo)', function () {
      list1.photo = 'photo2.jpg';
      (db.updateListing(user1.userid, list1.listid, list1.photo)).then(function () {
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
          assert.fail(error);
          done();
        });
    });
  });
  it('Update listing(Status)', function () {
    list1.status = 'pending';

    (db.updateListing(user1.userid, list1.listid, list1.status)).then(function () {
      assert.isTrue(true, 'Listing updated');
    }, function (error) {
        assert.fail(error);
        done();
      });
  });
  it('Update listing(Location)', function () {
    list1.location = 'DC';

    (db.updateListingLocation(user1.userid, list1.listid, list1.location)).then(function () {
      assert.isTrue(true, 'Listing updated');
    }, function (error) {
        assert.fail(error);
        done();
      });
  });
  it('retrieve listings', function () {
    (db.getAllListings()).then(function (list) {
      expect(list).to.have.length.above(0);
      assert(list[0].listid).equal(1);
    }, function (error) {
        assert.fail(error);
        done();
      });
  });
  /*
  describe('deleteUser()', function() {
    it ('delete a user from the user table cascade delete the listings and watch list', function() {
      (db.deleteUser()).then(()=>{}, (err)=>{});
    });
  });

  describe('getAllListings()', function() {
    it ('return all the listings', function() {
      (db.getAllListings()).then(()=>{}, (err)=>{});
    });
  });
   // NONE
  describe('getListings(return the listings that match the search criteria)', function() {
    it ('', function() {
      (db.getListings()).then(()=>{}, (err)=>{});
    });
  });
  //  Listing object
  describe('deleteListing()', function() {
    it ('Delete a listing, also delete the watch list entries for the item', function() {
      (db.deleteListing()).then(()=>{}, (err)=>{});
    });
  });
 //userid, listid
  describe('getSellList()', function() {
    it ('Return the items listed by a user', function() {
      (db.getSellList()).then(()=>{}, (err)=>{});
    });
  });
//userid
  describe('getWatchList()', function() {
    it ('Return the items being watched by the user', function() {
      (db.getWatchList()).then(()=>{}, (err)=>{});
    });
  });
 // userid
  describe('insertWatchList()', function() {
    it ('Add a watchlist entry for the user/listing', function() {
      (db.insertWatchList()).then(()=>{}, (err)=>{});
    });
  });
 //userid, listid
  describe('deleteWatchList()', function() {
    it ('Remove the watched iten from the users watchlist', function() {
      (db.deleteWatchList()).then(()=>{}, (err)=>{});
    });
  });
 //userid, listid
  describe('deleteEntireWatchList()', function() {
    it ('Delete the watched items for a user', function() {
      (db.deleteEntireWatchList()).then(()=>{}, (err)=>{});
    });
  });
 //
  describe('getWatchersForListing()', function() {
    it ('Return a list of users watching the selected listing', function() {
      (db.getWatchersForListing()).then(()=>{}, (err)=>{});
    });
  });

*/
});
