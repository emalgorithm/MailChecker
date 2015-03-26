var sendingEmails = require("./creator").sendingEmails;

var trueEmails = [];
var fakeEmails = [];

exports.compare = function() {
		
	sendingEmails.forEach(function(sent){
		if(fakeEmails.indexOf(sent) < 0){
			trueEmails.push(sent);
			console.log('True:'+sent);
		}
		else
			console.log('Very Fake:'+sent);
	});
	console.log('True size:'+trueEmails.length);
	console.log('Fake size:'+fakeEmails.length);
	console.log('Sending size:'+sendingEmails.length);
	
}

exports.trueEmails = trueEmails;
exports.fakeEmails = fakeEmails;
