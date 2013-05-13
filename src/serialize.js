var fs = require('fs');

function writeObjectToFile(object, file, callback){
	var json = JSON.stringify(object);
	fs.writeFileSync(file, json, {
		encoding: 'utf-8'
	});
	if(callback){
		callback();
	}
}

function readObjectFromFile(file, callback){
	var data = fs.readFileSync(file, {
		encoding: 'utf-8'
	});
	var object = JSON.parse(data);
	if(callback){
		callback(object);
	}
	return object;
}

module.exports = {
	readObjectFromFile: readObjectFromFile,
	writeObjectToFile: writeObjectToFile
};