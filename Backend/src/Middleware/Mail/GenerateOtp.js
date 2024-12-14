import otpGenerator from 'otp-generator';

// utils/generateOtp.js

const generateOtp = (length = 6, expirationMinutes = 5) => {
  const otp = otpGenerator.generate(length, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + expirationMinutes);

  return {
    otp,
    expiresAt: expirationTime,
  };
};


export default generateOtp;