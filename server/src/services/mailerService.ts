import nodemailer from "nodemailer";
import smtp from "../utils/smtp";

const transporter = nodemailer.createTransport(smtp);
export const sendMail = async (subject: string, text: string, targetMail: string): Promise<boolean> => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: targetMail,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    return true;
  } catch (error) {
    return false;
  }
};
