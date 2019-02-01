'use strict';
require('bootstrap');

let Vue = require('vue');
let toasts = require('./vue-toast');
Vue.use(toasts);

// var $ = require('jquery');

//TODO Aici intra bootbox si vue socket. Nu stiu inca daca am nevoie

let store = require('./store/login/store.js');

Vue.mixin ({
	store
});

let liquorTree = require('liquor-tree');
Vue.use(liquorTree);

let Loading = require('./components/Loading.vue');
let Login = require('./components/Login.vue');

let mapGetters = require('vuex').mapGetters;

new Vue({
	el: '#login2',
	data: {
		loading: true,
		username: 'Mihai',
	},
	render: function (render) {
		if (this.loading) return render(Loading);
		else return render(Login);
	} ,

	async created() {
		await this.$store.dispatch('settings/init');
		await this.$store.dispatch('user/updateUser');
		this.loading = false;
	},

	computed: {
		...mapGetters({
			user: 'user/user',
			token: 'user/token'
		})
	},

});