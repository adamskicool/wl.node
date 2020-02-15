const UserRouter = require("express").Router();
import { verifyLogin, verifySignup } from "./middleware";
import { getUserByUsername, createUser } from "./service";
import { User } from "../../../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IError } from "../type";

UserRouter.post("/login", verifyLogin, async (req, res) => {
  // const user: User = await getUserByUsername(req.body.username);
  // const match = await bcrypt.compare(req.body.password, user.password);
  // if (!match) {
  //   res.json({ message: "No such user" } as IError);
  // }
  const token = await jwt.sign(
    {
      data: "hejsan mannan" //user.username
    },
    process.env.JWTSECRET,
    { expiresIn: 60 }
  );
  res.json({ token }, 400);
});

UserRouter.post("/signup", verifySignup, async (req, res) => {
  // const passwordHash: string = await bcrypt.hash(
  //   req.body.password,
  //   process.env.SALT_ROUNDS
  // );
  const user: User = await createUser(
    req.body.username,
    req.bodypassword,
    req.body.email
  );

  res.json(user);
});

module.exports = UserRouter;
