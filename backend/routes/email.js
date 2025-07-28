const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { subject = "Shipment Notification", body, recipient } = req.body;

  if (!recipient) return res.status(400).json({ error: 'Missing recipient email' });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'avishwakarma9919@gmail.com',
        pass: 'xyha zvpx tqhh hvya', // your Gmail app password
      },
    });

    await transporter.sendMail({
      from: 'avishwakarma9919@gmail.com',
      to: recipient,
      subject,
      text: body,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
