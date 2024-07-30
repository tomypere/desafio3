import nodemailer from "nodemailer";
import envs from "../config/env.config.js";
import __dirname from "../../dirname.js";

export const sendMail = async (email, subject, message, template) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "tomastauscher@gmail.com",
      pass: envs.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "tomastauscher@gmail.com",
    to: email,
    subject,
    text: message,
    html: template,
    attachments: [
      {
        filename: "gatito.jpg",
        path: __dirname + "/public/images/gatito.jpg",
        cid: "gatito",
      },
    ],
  });
};