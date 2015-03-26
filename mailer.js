var nodemailer = require("nodemailer");

exports.sendEmails = function(receivers, readEmails){

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
		    user: 'Your email(gmail)',
		    pass: 'Your password'
		}
	});

	var mailOptions = {
		from: 'Testing <noreply@testing.com>', // sender address
		to: receivers, // list of receivers
		subject: 'Testing', // Subject line
		text: 'This is a text', // plaintext body
		html: '<b>This is a text</b>' // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
		    console.log("DIO BOIA");
		}else{
		    console.log('Message sent: ' + info.response);
		}
		setTimeout(function(){
	    	readEmails(); 
	    }, 35000);
	});
}
