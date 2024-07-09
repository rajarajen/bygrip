require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Body parser middleware to parse incoming request bodies
app.use(bodyParser.json());

// Route to handle incoming email requests
app.post("/send-email", async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  // Validate input (basic validation)
  if (!name || !email || !phoneNumber || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create reusable transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", // convert string to boolean
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: email,
      to: `"ByGrip" <${process.env.SMTP_MAIL}>`,
      subject: "Carrer Information",
      text: `Message from ${name} (${email}, ${phoneNumber}): ${message}`,
    });

    console.log("Message sent: %s", info.messageId);
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});
app.post("/enquiry-email", async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  // Validate input (basic validation)
  if (!name || !email || !phoneNumber || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create reusable transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", // convert string to boolean
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: email,
      to: `"ByGrip" <${process.env.SMTP_MAIL}>`,
      subject: "Enquiry of Bygrip service",
      text: `Message from ${name} (${email}, ${phoneNumber}): ${message}`,
    });

    console.log("Message sent: %s", info.messageId);
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
