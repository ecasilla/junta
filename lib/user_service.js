/*! 
 * junta-code-challenge v0.0.1
 *
 * Copyright (c) 2014 Ernie Casilla
 * License: MIT
 */

/**
 * @module user_service
 * @version 0.0.1
 */
var async = require('async'),
  util = require('util'),
  userCrudService = require('./user_crud_service');

//Utility Funtion
function inspector(obj) {
    "use strict";
    return util.inspect(obj, {
      showHidden: true,
      colors: true,
      depth: null
    });
  }
  /**
   * memberOf module:user_service
   * @description This is the get user function which gets a user from a datastore
   * @param {number} id - takes a user id
   * @param {Async~requestCallback} cb - The callback that handles the response.
   * @return {instance} returns the user instance
   * @return {Error} returns an error object if the db call was unsuccessful
   */
function getUser(id, cb) {
    "use strict";
    userCrudService.get(id, function (err, user) {
      if (err) {
        console.log(inspector(err));
        cb(err);
      }
      cb(null, user);
    });
  }
  /**
   * memberOf module:user_service
   * @description Update a users timestamp passing a reference to the current user object
   * @param {object} user - takes a user instance
   * @param {Async~requestCallback} cb - The callback that handles the response.
   * @returns the new modified user instance with the updated time.
   *
   */
function updateUserTimestamp(user, cb) {
    "use strict";
    console.log(inspector(user));
    var d = new Date();
    user.timestamp = d.getTime();
    cb(null, 1, user);
  }
  /**
   * memberOf module:user_service
   * @description saves the User back to the datastore
   * @parma {number} id - the user id to be saved
   * @param {object} user - take a user instance
   * @param {Async~requestCallback} cb - The callback that handles the response.
   * @return the saved user instance.
   */
function saveUser(id, user, cb) {
  "use strict";
  userCrudService.save(id, user, function (err, user) {
    if (err) {
      cb(err);
    }
    cb(null, user);
  });
}

/**
 * memberOf module:user_service
 * @description This is sort of a noop function its only
 * task is to kick off the waterfall with a stub id
 * @param {Async~requestCallback} cb - The callback that handles the response.
 *
 */
function noop(cb) {
  "use strict";
  var id = 1;
  cb(null, id);
}

/**
 * memberOf module:user_service
 * @description This a wrapper for the waterfall fn
 * which allows me to export for unit testing
 * @param {Async~requestCallback} cb - The callback that handles the waterfall results or err
 *
 *
 */
function asyncFn(cb) {
  'use-strict';
  async.waterfall([
    noop,
    getUser,
    updateUserTimestamp,
    saveUser
  ], cb);
}

asyncFn(function (err, results) {
  'use-strict';
  if (err) {
    util.error(err.message);
  }
  console.log(inspector(results));
  return results;
});


module.exports = asyncFn;
