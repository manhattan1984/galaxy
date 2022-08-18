"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// async function emailHandler(req, res) {


//     const data = JSON.parse(req.body);

//     const {email, message} = data;

// //   let transporter = nodemailer.createTransport({
// //     host: "smtp-relay.sendinblue.com",
// //     port: 587,
// //     secure: false, // true for 465, false for other ports
// //     auth: {
// //       user: "galaxydholding@gmail.com", // generated ethereal user
// //       pass: "shyVIY2QJOf7njHB", // generated ethereal password
// //     },
// //   });

// //   let info = await transporter.sendMail({
// //     from: '"Galaxy Holdings" <galaxydholding@gmail.com>', // sender address
// //     to: "mikkimanhattan@gmail.com", // list of receivers
// //     subject: "Hello ✔", // Subject line
// //     text: "Hello world?", // plain text body
// //     html: `<p>Does this work</p>`, // html body
// //   });

//   console.log("Message sent: %s", info.messageId);

// }

// main().catch(console.error);


export default async function handler(req, res) {

  const data = JSON.parse(req.body);


  const { email, message, subject } = data;

  console.log(email);
  console.log(message);

  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "contactgalaxyholdings@gmail.com", // generated ethereal user
      pass: "OLq07msh1F35pXtb", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Galaxy Holdings" <galaxydholding@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `${message}`, // plain text body
    html: `
             <html>
                <body>
                    <img src="https://firebasestorage.googleapis.com/v0/b/galaxydholdings.appspot.com/o/6285240B-4269-4374-AD92-6A57AC860285.jpeg?alt=media&token=8c8cca43-bec7-4526-8a36-9bdbbbfcb3d3">
                    ${message}
                </body>
             </html>
             `, // html body
  });

  console.log("Message Sent!");
}