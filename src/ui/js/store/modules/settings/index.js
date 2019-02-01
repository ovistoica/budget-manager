'use strict';
let Vue = require('vue');
let _ = require('lodash');
let setup = require('../setup');

module.exports = {
	namespaced: true,
	state : {
		NAME: 'Budget Manager',
		LOGIN: '/login.html',
		ERROR: './error.html',
		HOME: './home.html',
		//TODO: Other properties here
		roles: [
			{
				name: 'user',
				title: 'User'
			},
			{
				name: 'admin',
				title: 'Administrator'
			}
		]

	},
	getters: {
		NAME (state)
		{
			return state.NAME;
		},
		ROLES (state)
		{
			return state.ROLES;
		}
	},
	actions: {
		async init (store)
		{
			try
			{
				let response = await Vue.http.get (setup.API+'/settings');
				console.log (response);	
				store.commit ('init', response.data);
				
			}
			catch (e)
			{
				store.dispatch ('redirect', 'ERROR');
			}
		},
		redirect (store, application)
		{
			let address = store.state[application];
			console.log (address);
			if (address !== '' && address !== undefined && address !== null)
			{
				console.log ('Redirect to '+address);
				window.location.href = address;
			}
		}
	},
	mutations: {
		init (state, settings)
		{
			// if (settings.WORKSPACE.indexOf ('http')!==0) settings.WORKSPACE = location.protocol+'//'+settings.WORKSPACE;
			_.assign (state, settings);
		}
	}



};