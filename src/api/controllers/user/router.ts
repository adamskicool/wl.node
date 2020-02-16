const UserRouter = require("express").Router();
import { verifyLogin, verifySignup } from "./middleware";
import { getUserByUsername, createUser } from "./service";
import { User } from "../../../entity/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { IError } from "../type";

const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS);

UserRouter.post("/login", verifyLogin, async (req, res) => {
  const user: User = await getUserByUsername(req.body.username);
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    res.status(500).json({ message: "No such user" } as IError);
    return;
  }
  const token = await jwt.sign(
    {
      data: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.status(400).json({ token });
});

UserRouter.post("/signup", verifySignup, async (req, res) => {
  const passwordHash: string = await bcrypt.hash(
    req.body.password,
    SALT_ROUNDS
  );
  const user: User = await createUser(
    req.body.username,
    passwordHash,
    req.body.email
  );
  res.status(400).json(user);
});

module.exports = UserRouter;
