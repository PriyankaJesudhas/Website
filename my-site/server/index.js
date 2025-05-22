import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());          // allow requests from Vite dev server
app.use(express.json());  // parse JSON bodies

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,   // you@gmail.com
    pass: process.env.MAIL_PASS,   // 16-char App Password
  },
});

// endpoint hit from the Quote form
app.post("/api/quote", async (req, res)=> {
  const { jobType, description, email } = req.body;
  if (!jobType || !description || !email)
    return res.status(400).send("Missing field");

  try {
    await transporter.sendMail({
      from: email,
      to: "priyanka@avteks.in",
      subject: "Quote Request",
      text: `Job Type: ${jobType}\n\nDescription:\n${description}\n\nEmail: ${email}`,
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("API listening on http://localhost:" + PORT));
