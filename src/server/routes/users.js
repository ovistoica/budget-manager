'use strict';

var express = require('express');
var debug = require('debug')('budget-manager:user-routes');
var db = require('../database/database.js');
var error = require('../error.js');
var tokens = require('./redis-tokens.js');

var publicApp = express.Router();
var privateApp = express.Router();
var adminApp = express.Router();


debug.log = console.info.bind(console);

publicApp.post('/login', async function(req, res, next) {
	var e;
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		req.debug(debug, 'Searching for ' + username);
		let user = await db.user.findByUsernameAndPassword(username, password);
		if (user) {
			req.debug(debug, 'Found user ' + user);
			var token = tokens.createToken();
			await tokens.set(token, user.userId);
			req.debug(debug, 'User ' + user.username + ':' + user.userId + ' logged in');

			res.status(200).send({ err: 0, token: token });
		} else {
			req.debug(debug, 'User or password are not correct');
			e = error.unauthorized('User or password are not correct');
			next(e);
		}
	} else {
		req.debug(debug, 'All fields are required');
		e = error.badRequest('All fields are required');
		next(e);
	}
});

async function security(req, res, next) {
	var e;
	let token = null;
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		token = req.headers.authorization.split(' ')[1];
	}
	if (!token && req.headers.Authorization && req.headers.Authorization.split(' ')[0] === 'Bearer') {
		token = req.headers.Authorization.split(' ')[1];
	}
	if (!token) {
		token = req.query.token;
	}
	if (!token) {
		token = req.body.token;
	}
	req.token = token;

	let user;
	if (token) {
		req.debug(debug, 'got token' + token);
		var userId = await tokens.get(token);
		req.debug(debug, 'searching for user ' + userId);
		user = await db.user.findByUserId(userId);
	}
	if (user) {
		req.user = user;
		next();
	} else {
		e = error.unauthorized('Please login first');
		next(e);
	}
}

module.exports.publicRoutes = publicApp;
module.exports.security = security;
module.exports.privateRoutes = privateApp;
module.exports.adminRoutes = adminApp;