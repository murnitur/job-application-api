import jwt from "jsonwebtoken";

export const generateAccessToken = (data: any, duration: string = "7 days") => {
  return jwt.sign(data, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};
