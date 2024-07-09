require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware to parse incoming request bodies
app.use(bodyParser.json());

// CORS middleware with options
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: ["GET", "POST"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type"], // Allow these headers
  optionsSuccessStatus: 200, // Respond with 200 for preflight requests
};

// Enable CORS for all routes or specific routes
app.use("/send-email", cors(corsOptions));
app.use("/enquiry-email", cors(corsOptions));

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
      from: `"ByGrip" <${process.env.SMTP_MAIL}>`,
      to: email,

      subject: "Carrer Information",
      text: `Message from ${name} ${email}, ${phoneNumber}: ${message}`,
    });

    console.log("Message sent: %s", info.messageId);
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// Route to handle enquiry email requests
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
      from: `"ByGrip" <${process.env.SMTP_MAIL}>`,
      to: email,

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
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
