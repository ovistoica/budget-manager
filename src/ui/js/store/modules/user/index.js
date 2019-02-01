'use strict';
const Vue = require('vue');
const setup = require('../setup');
const statusCodes = require('http-status-codes');

let KEY_TOKEN = 'Budget.token';
Vue.http.interceptors.push(function(req, next) {
	if(window.localStorage.getItem(KEY_TOKEN)) {
		req.headers.set('Authorization', 'Bearer ' + window.localStorage.getItem(KEY_TOKEN));
	}
	next();
});

module.exports = {
	namespaced : true,
	state : {
		token: window.localStorage.getItem('KEY_TOKEN'),
		role: null,
		user: null,
		userId: null,
		users: null
	},
	getters: {
		token(state) {
			return state.token;
		}, 
		role(state) {
			return state.role;
		},
		isLoggedIn(state) {
			return state.token && state.token !== '';
		},
		user(state) {
			return state.user;
		},
	},
	actions: {
		async login(store, credentials) {
			try {
				let response = await Vue.http.post(setup.API + '/users/login', credentials);
				console.log(response.data.role);
				if(response.data.token)  {
					store.commit('setToken', response.data.token);
				}
				return true;
			} catch(err) {
				if (err.status === 0) {
					Vue.toast.connectionError();
				} else  if (err.status >= 500) {
					Vue.toast.warning({title: 'Warning', message: 'Couldn\'t login. <br> Server error: ' + err.body.err});
				}
				return false;
			}

		}, 
		async logout(store) {
			try {
				let response = await Vue.http.get(setup.API + 'users/logout');
				store.commit('setToken', null);
				if (response.data.err === 0) {
					return true;
				} else {
					Vue.toast.warning({title:'Warning', message:'Couldn\'t logout.<br>Server error: ' + response.data.err});
					return false;
				}

			}catch(e) {
				if (e.status === 0) {
					Vue.toast.connectionError();
				} else  if (e.status >= 500) {
					Vue.toast.warning({title: 'Warning', message: 'Couldn\'t login. <br> Server error: ' + e.body.err});
				}
				return false;
			}
		},
		async addUser(user) {
			console.log(user);
			try {
				let response = await Vue.http.post(setup.API + '/users/register', user);
				if (response.data.err === 0) {
					return true;
				} else if(response.data.err === statusCodes.BAD_REQUEST) {
					Vue.toast.warning({title:'Warning', message:'Couldn\'t add user.<br>User already exists : ' + response.data.err});
					return false;
				}
			} catch (e) {
				if (e.status === 0)
					Vue.toast.connectionError();
				else if (e.status >= 500)
					Vue.toast.warning({title:'Warning', message:'Couldn\'t add an user.<br>Server error: ' + e.body.err});
				return false;
			}
		},
		async updateUser (store)
		{
			try
			{
				let response = await Vue.http.get(setup.API+'/users/info');
				if (response.data.err === 0)
				{
					store.commit ('setUser', response.data.user);
					return true;
				}
			}
			catch (e)
			{
				if (e.status === 401)
				{
					store.commit ('setUser', null);
					store.commit ('setToken', null);
				} else if (e.status === 0) {
					Vue.toast.connectionError();
					return false;
				} else {
					Vue.toast.warning({title:'Warning!', message:'The token has expired.<br>Server error: ' + e.body.err});
					store.commit ('setUser', null);
					store.commit ('setToken', null);
					return false;
				}
			}
		},
	},
	mutations: {
		setToken(state, value) {
			if (value !== null) {
				window.localStorage.setItem(KEY_TOKEN, value);
				state.token = value;
			} else {
				window.localStorage.removeItem(KEY_TOKEN);
				state.token = undefined;
			}
		},
		setRole(state, value) {
			state.role = value;
		},
		setUser(state, value) {
			state.user = value;
		},
		setUserId(state, value) {
			state.userId = value;
		}
	}
};


