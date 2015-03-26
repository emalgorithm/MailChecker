var Imap = require('imap');
var inspect = require('util').inspect;
var comparison = require('./comparison');


var imap = new Imap({
  user: 'Your Email(gmail)',
  password: 'Your password',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});


function openInbox(cb) {
  imap.openBox('INBOX', false, cb);
}

var count = 0;

imap.once('ready', function() {
  openInbox(function(err, box) {
  if (err) throw err;
  imap.search([ 'UNSEEN' ], function(err, results) {
    if (err) console.log('you are already up to date');
    var f = imap.fetch(results, { markSeen: true, bodies: '' });
    f.on('message', function(msg, seqno) {
      //console.log('Message #%d', seqno);
      msg.on('body', function(stream, info) {
        stream.on('data', function(chunk) {
		    var buffer = '';
		    buffer += chunk.toString('utf8');
		    if(buffer != "")
		    	findEmailAddress(buffer);     
        });
      });
      msg.once('attributes', function(attrs) {
        //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
      msg.once('end', function() {
        //console.log('Message #%d', seqno);
      });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      imap.end();
    });
  });
});
});

imap.once('error', function(err) {
  console.log(err);
});
var ris = 0;
imap.once('end', function() {
  console.log('Connection ended');
  console.log('ris: ' + ris);
  setTimeout(function(){
      	comparison.compare();
      }, 5000);
});

var count = 1;

var findEmailAddress = function(text){
	console.log(count++);
	var pattern = 'Delivery to the following recipient failed permanently:';
    var initialPosition = text.indexOf(pattern);
    if(initialPosition < 0){
    	console.log('Nothing found');
    	return;
    }
    var transfer = pattern.length; 
    text = text.substr(initialPosition + transfer, 70);
    console.log(text);
    var end = text.indexOf('Technical');
    text = text.substr(0,end);
    text = text.replace(/ /g,'');
    text = text.replace(/(\r\n|\n|\r)/gm,"");;
    
    if(text != "")
    	comparison.fakeEmails.push(text);
    if(text != "")
    	console.log('Fake: '+text);
    ris++;
}

exports.readEmails = function() {
	imap.connect();
}



