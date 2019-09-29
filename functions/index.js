const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');


const gmailLogin = functions.config().gmail.login;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();


var goMail = function (mail, name, message, date) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailLogin,
            pass: gmailPassword
        }
    });

    const mailOptions = {
        from: gmailLogin,
        to: 'krolikmat@gmail.com',
        subject: '✔ contact-form-msg',
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
      </html>`,
    };


    const getDeliveryStatus = function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);

    };


    transporter.sendMail(mailOptions, getDeliveryStatus);
};


exports.onDataAdded = functions.database.ref('/messages/{sessionId}').onCreate(function (snap, context) {


    const createdData = snap.val();
    let mail = createdData.mail;
    let name = createdData.name;
	  let message	= createdData.message;
	  let date = createdData.date;

    goMail(mail, name, message, date);
});