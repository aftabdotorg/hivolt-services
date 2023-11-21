const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Minimum 3 characters required" })
    .max(20, { message: "Maximum 20 characters required" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone Number Invalid" })
    .max(20, { message: "Maximum 20 characters required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Minimum 7 characters required" })
    .max(100, { message: "Maximum 100 characters required" }),
});

module.exports = signupSchema;
