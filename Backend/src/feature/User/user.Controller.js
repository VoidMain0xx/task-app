import userModel from "./user.Model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.Repository.js";
import bcrypt from "bcrypt";
import { otp } from "../../Middleware/Mail/sendMail.js";

export default class UserController {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  // Signup method
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).send({ error: "All fields are required" });
      }
  
      const existingUser = await this.UserRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).send({ error: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = { name, email, password: hashedPassword };
      const user = await this.UserRepository.singUp(newUser);
  
      res.status(201).send({ message: "User created successfully", user });
    } catch (error) {
      console.error("Error in signUp:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
  

  // Signin method
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).send({ error: "Email and password are required" });
      }

      // Find user by email
      const user = await this.UserRepository.findByEmail(email);
      if (!user) {
        return res.status(400).send({ error: "Incorrect credentials" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ error: "Incorrect credentials" });
      }

      // Generate token
      const token = jwt.sign(
        {
          userID: user._id,
          email: user.email,
        },
        "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",
        { expiresIn: "7d" }
      );

      res.status(200).send({ message: "Login successful", token });
    } catch (error) {
      console.error("Error in signIn:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  // Generate and send OTP
  async getOtp(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).send({ error: "Email is required" });
      }

      const result = await this.UserRepository.getOtp(email);
      res.status(201).send({ message: "OTP sent successfully", result });
    } catch (error) {
      console.error("Error in getOtp:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  // Verify OTP
  async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;

      // Validate input
      if (!email || !otp) {
        return res.status(400).send({ error: "Email and OTP are required" });
      }

      // Find user by email
      const user = await this.UserRepository.findByEmail(email);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      // Validate OTP
      if (user.otp !== otp) {
        return res.status(400).send({ error: "Invalid OTP" });
      }

      // Clear the OTP after verification
      await this.UserRepository.verifyOtp(email, null);
      res.status(200).send({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error in verifyOtp:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  // Reset Password
  async newPassword(req, res) {
    try {
      const { email, newPassword } = req.body;

      // Validate input
      if (!email || !newPassword) {
        return res.status(400).send({ error: "Email and new password are required" });
      }

      // Find the user by email
      const user = await this.UserRepository.findByEmail(email);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      // Hash the new password and update it
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      const updatedUser = await this.UserRepository.resetPassword(email, hashedPassword);

      res.status(200).send({ message: "Password reset successfully", updatedUser });
    } catch (error) {
      console.error("Error in newPassword:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
}
