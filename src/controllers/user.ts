import { log } from "@drantaz/f-log";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { generateAccessToken } from "../utils";

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required fields!" });
    const hash = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hash });
    res.json({ ...user.toJSON(), password: undefined });
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found!" });
    const match = bcrypt.compareSync(password, user.dataValues.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = generateAccessToken({ email });
    res.json({ ...user.toJSON(), password: undefined, token });
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};
