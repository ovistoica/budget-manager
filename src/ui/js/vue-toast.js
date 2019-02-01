var $ = require ('jquery');
require('bootstrap-notify');

module.exports.install = function (Vue) 
{
	let data = {};
	Vue.toast = {	
		connectionError: function(){
			let time = 2000;
			if (!data['error'])
			{
				data['error'] = true;
				setTimeout (function ()
				{
					data['error'] = null;
				}, time + 500);
				$.notify({
					title: 'ERROR',
					message: 'CONNECTION ERROR.<br>Check your internet connection!'
				},{
					type: 'danger',
					animate: {
						enter: 'animated zoomInDown',
						exit: 'animated zoomOutUp'
					},
					newest_on_top: true,
					allow_dismiss: true,
					delay: time,
					template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
							'<span data-notify="title"><strong>{1}</strong></span><br>' +
							'<span data-notify="message">{2}</span>' +
							'</div>'
				});
			}
		},

		warning: function(component){
			let time = 2000;
			if (!data[component.title+':'+component.message])
			{
				data[component.title+':'+component.message] = true;
				setTimeout (function ()
				{
					data[component.title+':'+component.message] = null;
				}, time + 500);
				$.notify({
					title: component.title,
					message: component.message
				},{
					type: 'warning',
					animate: {
						enter: 'animated zoomInDown',
						exit: 'animated zoomOutUp'
					},
					newest_on_top: true,
					allow_dismiss: true,
					delay: time,
					template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
							'<span data-notify="title"><strong>{1}</strong></span><br>' +
							'<span data-notify="message">{2}</span>' +
							'</div>'
				});
			}
		}
	};
};