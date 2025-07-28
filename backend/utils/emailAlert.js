const express = require('express');
const router = express.Router();
const sendEmailAlert = require('../utils/emailAlert');

router.post('/send-email', async (req, res) => {
  const { subject, body, recipient } = req.body;

  if (!recipient) {
    return res.status(400).json({ error: 'Missing recipient email' });
  }

  const result = await sendEmailAlert({ subject, body, recipient });

  if (result.success) {
    return res.status(200).json({ message: 'Email sent successfully' });
  } else {
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
