const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || "your-test-email@gmail.com",
      pass: process.env.EMAIL_PASS || "your-test-password",
    },
  });

  const mailOptions = {
    from: "Your App <no-reply@yourapp.com>",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email sent to: ${to}`);
};

module.exports = sendEmail;
