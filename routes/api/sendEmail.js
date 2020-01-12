// bring in nodemaile module to send emails
const nodemailer = require("nodemailer");

// Add method to send emails using nodemailer
sendEmail = (post, callback = () => {}) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass:
        "" // generated ethereal password
    }
  });

  const downloadLink = `http://localhost:3000/api/shared/${post._id}`;

  const mailOptions = {
    from: post.from,
    to: post.to,
    subject: "Someone has shared some files with you!",
    text: post.message,
    html: `<p> An email has been received from ${
      post.from
    }. Click <a href="${downloadLink}">here</a> to download the files.</p><br><br>Message: ${
      post.message
    }`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
    // console.log(mailOptions);
    return callback(error, info);
  });
};

module.exports = sendEmail;
