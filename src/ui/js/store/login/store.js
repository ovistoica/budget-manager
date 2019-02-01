'use strict';
let Vue = require('vue');
let VueResource = require('vue-resource');
let Vuex = require('vuex');
let settings = require('../modules/settings');
let user = require('../modules/user');
Vue.use(VueResource);
Vue.use(Vuex);

module.exports = new Vuex.Store({
	modules: {
		settings,
		user
	},
	strict: process.env.NODE_ENV !== 'production'
});




