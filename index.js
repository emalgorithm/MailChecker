var receiver = require('./receiver');
var mailer = require('./mailer');
var creator = require('./creator');
var comparison = require('./comparison');
var reader = require('./reader');




var execute = function(){
    reader.people.forEach(function(person){
        var name = person[0];
        var surname = person[1];
        var company = person[2];
        creator.createSendingEmails(name, surname, company);
    });
    mailer.sendEmails(creator.sendingEmails, receiver.readEmails);

}

reader.readFile(execute);

