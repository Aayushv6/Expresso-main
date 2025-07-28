const nodemailer = require('nodemailer');

const sendEmailAlert = async ({ subject, body, recipient }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,         // your Gmail address
        pass: process.env.EMAIL_PASSWORD,     // your Gmail app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: subject || 'Shipment Notification',
      text: body || '',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error };
  }
};

module.exports = sendEmailAlert;
