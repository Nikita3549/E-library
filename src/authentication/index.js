'use strict';
const setUserData = require('./setUserData.js');
const isAuth = require('./isAuth.js');
const login = require('./login.js');

const authentication = {
    setUserData,
    isAuth,
    login,
}

module.exports = authentication;
