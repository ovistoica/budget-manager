'use strict';

var express = require ('express');
var router = express.Router ();

router.get ('/', function (req, res)
{
	res.send ({
		NAME: process.env.WYLIODRIN_NAME || 'Wyliodrin Lab',
	});
});

module.exports = router;
