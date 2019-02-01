<template>
	<p>First test. Please sign in</p>
</template>

<script>

var mapGetters = require('vuex').mapGetters;

module.exports = {
	name: 'Login',
	data() {
		return {
			username: '',
			password: '',
		};
	},
	methods: {
		async login () {
			if (!this.user)
			{
				let login = await this.$store.dispatch ('user/login', {
					username: this.username,
					password: this.password
				});

				if (login)
				{
					await this.$store.dispatch ('user/updateUser');
					this.username = '';
					this.password = '';
					this.home();
				}
				else {
					this.password = '';
				}
			}
			else
			{
				this.home();
			}
		},
		home ()
		{
			this.$store.dispatch('/settings/redirect', 'HOME');
		},
		async logout () {
			await this.$store.dispatch ('user/logout');
			this.$store.dispatch ('user/updateUser');
		},
	},
	computed: mapGetters ({
		user: 'user/user',
		courses: 'course/userCourses',
		board: 'board/board',
		NAME: 'settings/NAME'
	}),
};

</script>