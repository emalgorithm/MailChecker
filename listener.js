var MailListener = require("mail-listener2");

var mailListener = new MailListener({
  username: "marco.loco.recruiter@gmail.com",
  password: "coci2014",
  host: "imap.gmail.com",
  port: 993, // imap port
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
});

module.exports.startListening = function(){
	mailListener.start(); // start listening
}

// stop listening
//mailListener.stop();

mailListener.on("server:connected", function(){
  console.log("imapConnected");
});

mailListener.on("server:disconnected", function(){
  console.log("imapDisconnected");
});

mailListener.on("error", function(err){
  console.log(err);
});

mailListener.on("mail", function(mail, seqno, attributes){
  // do something with mail object including attachments
  console.log("emailParsed", mail);
  // mail processing code goes here
});

mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});

// it's possible to access imap object from node-imap library for performing additional actions. E.x.
//mailListener.imap.move(:msguids, :mailboxes, function(){})
