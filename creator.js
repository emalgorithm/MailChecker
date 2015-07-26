var mailer = require('./mailer');

var domains = ["it", "com"];
var sendingEmails = [];

var createEmails = function(firstPart, secondPart, company){
    domains.forEach(function(domain){
        sendingEmails.push(firstPart+secondPart+'@'+company+'.'+domain);
        sendingEmails.push(firstPart+'.'+secondPart+'@'+company+'.'+domain);
        sendingEmails.push(firstPart+'-'+secondPart+'@'+company+'.'+domain);
        sendingEmails.push(firstPart+'_'+secondPart+'@'+company+'.'+domain);
        sendingEmails.push(secondPart+firstPart+'@'+company+'.'+domain);
        sendingEmails.push(secondPart+'.'+firstPart+'@'+company+'.'+domain);
        sendingEmails.push(secondPart+'-'+firstPart+'@'+company+'.'+domain);
        sendingEmails.push(secondPart+'_'+firstPart+'@'+company+'.'+domain);
    });
}

var createSendingEmails = function(name,surname,company) {
    createEmails(name,surname,company);
    createEmails(name.substr(0,3),surname, company);
    createEmails(name,surname.substr(0,3), company);
    createEmails(name.substr(0,3),surname.substr(0,3), company);
    createEmails(name,surname.charAt(0), company);
    createEmails(name.charAt(0),surname, company);
}

exports.sendingEmails = sendingEmails;
exports.createSendingEmails = createSendingEmails;
