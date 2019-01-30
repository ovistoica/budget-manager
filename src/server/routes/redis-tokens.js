var redis = require('redis');
var { promisify } = require('util');
var uuid = require('uuid');

var client = redis.createClient();

function createToken() {
	return uuid.v4() + uuid.v4() + uuid.v4() + uuid.v4();
}

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const KEY = 'budget-manager:';

client.on('error', function(err) {
	console.log('Error' + err);
});

function set(key, value) {
	return setAsync(KEY + key, value);
}

function get(key) {
	return getAsync(KEY + key);
}

function del(key) {
	return delAsync(KEY + key);
}

module.exports.get = get;
module.exports.set = set;
module.exports.del = del;
module.exports.createToken = createToken;