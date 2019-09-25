const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

//to make it work you need gmail account
const gmailLogin = functions.config().gmail.login;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();

//creating function for sending emails
var goMail = function (mail, name, message, date) {

//transporter is a way to send your emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailLogin,
            pass: gmailPassword
        }
    });

    // setup email data with unicode symbols
    //this is how your email are going to look like
    const mailOptions = {
        from: gmailLogin, // sender address
        to: 'krolikmat@gmail.com', // list of receivers
        subject: '✔ contact-form-msg', // Subject line
        html: `<html>
        <head>
        </head>
        <body>
          <div style="margin:0 auto;width:90%;">
            <h3 style="text-align:center;">${name}</h3>
          </div>
          <div style="margin:0 auto;width:80%;">
            <span class="email" style="float:left;">email: ${mail}</span>
            <span class="date" style="float:right;">date: ${date}</span>
          </div>
          <hr style="margin:0 auto;width:80%;">
          <div class="content" style="margin:0 auto;width:80%;text-align:center;">
            <p style="padding:15px;text-align:justify;margin:0 auto;">${message}</p>
          </div>
        </body>
      </html>`, // html body
    };

    //this is callback function to return status to firebase console
    const getDeliveryStatus = function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    };

    //call of this function send an email, and return status
    transporter.sendMail(mailOptions, getDeliveryStatus);
};

//.onDataAdded is watches for changes in database
exports.onDataAdded = functions.database.ref('/messages/{sessionId}').onCreate(function (snap, context) {

    //here we catch a new data, added to firebase database, it stored in a snap variable
    const createdData = snap.val();
    let mail = createdData.mail;
    let name = createdData.name;
	let message	= createdData.message;
	let date = createdData.date;

    //here we send new data using function for sending emails
    goMail(mail, name, message, date);
});