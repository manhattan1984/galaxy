const nodemailer = require("nodemailer")
const cors = require('cors')({origin: true})


async function emailHandler(req, res) {
    const data = JSON.parse(req.body)
    const {email, message} = data

    console.log("hello world");

    let transporter = nodemailer.createTransport({
        host: "mail.galaxydholdings.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "info@galaxydholdings.com", // generated ethereal user
          pass: "Forever2021", // generated ethereal password
        }
      });

      let info = await transporter.sendMail({
          from: '"Galaxy Holdings" <info@galaxydholdings.com"',
          to: "mikkimanhattan@gmail.com",
          subject: "Hello",
          text: "hello world",
          html: "<p>hi</p>"
      });

      console.log("Message sent: %s", info.messageId)
}

export default emailHandler