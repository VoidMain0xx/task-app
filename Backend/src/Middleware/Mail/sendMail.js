import nodemailer from "nodemailer";
import generateOtp from "../../Middleware/Mail/GenerateOtp.js";

export var otp = generateOtp(4, 5);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "codingninjas2k16@gmail.com",
    pass: "slwvvlczduktvhdj",
  },
});

export default function mailSent(email) {
  console.log("email : " , email.email);
  console.log(otp.otp);
  const sendOtp =  otp.otp;
  const mailOption = {
    from: "codingninjas2k16@gmail.com",
    to: email.email,
    subject: "PassWord reset",
    text: `your otp is ${sendOtp}. The current Otp is valid for next 5 mins`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}