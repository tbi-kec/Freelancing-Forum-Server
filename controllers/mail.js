const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.otp_sendEmail = async (req, res) => {
  try {
    var otp = req.body.otp;
    var kongu_email = req.body.kongu_email
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      // true for 465, false for other ports
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      service: "Gmail",
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      // sender address

      from: "freelancer@kongu.edu",
      to: kongu_email, // list of receivers
      subject: "KEC | TBI FreeLancer Foreum", // Subject line
      text: "KEC | TBI FreeLancer Foreum", // plain text body
      html: `<p> Here the OTP for your verification => <b> ${otp} </b><p>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    info.messageId ? res.status(200).json('OTP Send Successfully') : res.status(500).json('Error Occured!')
  } catch (e) {
    res.status(500).json(e);
  }


}

module.exports.resetpassword_sendEmail = async (user_mail, message, link) => {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      // true for 465, false for other ports
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      service: "Gmail",
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      // sender address

      from: "freelancer@kongu.edu",
      to: user_mail, // list of receivers
      subject: "KEC | TBI FreeLancer Foreum", // Subject line
      text: message, // plain text body
      html: ` <b> ${link} </b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (e) {
    res.status(500).json(e);
  }

}


module.exports.notify_user = async (user_mail, message) => {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      // true for 465, false for other ports
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      service: "Gmail",
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      // sender address

      from: "freelancer@kongu.edu",
      to: user_mail, // list of receivers
      subject: "KEC | TBI FreeLancer Foreum", // Subject line
      text: message, // plain text body
      html: ` <p> ${message} </p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (e) {
    res.status(500).json(e);
  }

}


module.exports.notify_both_user = async (user_mail, user_message, provider_mail, provider_message) => {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      // true for 465, false for other ports
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      service: "Gmail",
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info1 = await transporter.sendMail({
      // sender address

      from: "freelancer@kongu.edu",
      to: user_mail, // list of receivers
      subject: "KEC | TBI FreeLancer Foreum", // Subject line
      text: user_message, // plain text body
      html: ` <p> ${user_message} </p>`, // html body
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      // sender address

      from: "freelancer@kongu.edu",
      to: provider_mail, // list of receivers
      subject: "KEC | TBI FreeLancer Foreum", // Subject line
      text: provider_message, // plain text body
      html: ` <p> ${provider_message} </p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Message sent: %s", info1.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (e) {
    res.status(500).json(e);
  }

}
