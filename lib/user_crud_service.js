/*! 
 * junta-code-challenge v0.0.1
 *
 * Copyright (c) 2014 Ernie Casilla
 * License: MIT
 */

/**
 * @description stub crud service
 * @module userCrudService
 * @version 0.0.1
 */
var userCrudService = (function () {
  /**
   * @memberOf module:userCrudService
   * @description This is a stub object for the in memory datastore
   * @type {Object.<number,object>}
   */
  'use-strict';
  var users = {
    1: {
      id: 1,
      name: "Junta",
      timestamp: Date.now()
    },
    2: {
      id: 2,
      name: "Ernie",
      timestamp: Date.now()
    }
  };
  /**
   * @memberOf module:userCrudService
   * @description The async stub for getting a user
   * @param {number} The integer for the user id
   * @param {Async~requestCallback} cb - The callback that handles the response.
   */
  function get(userId, cb) {
      setTimeout(function () {
        if (!users[userId]) {
          cb(new Error("user not found!"), null);
        }
        if (users[userId]) {
          cb(null, users[userId]);
        }
      }, 500);
    }
    /**
     * @memberOf module:userCrudService
     * @description Async Stub for saving a user to the in memory store
     * @param {Number} The id for the user object
     * @param {object} the delta for the user object to which it will replace
     * @param {Async~requestCallback} cb - The callback that handles the response.
     */
  function save(userId, delta, cb) {
    setTimeout(function () {
      users[userId] = delta;
      cb(null, delta);
    }, 1000);
  }

  return {
    get: get,
    save: save
  };
})();


module.exports = userCrudService;
