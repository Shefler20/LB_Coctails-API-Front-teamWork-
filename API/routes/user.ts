import express from "express";
import User from "../models/User";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config";
import { imagesUpload } from "../middleware/multer";
import { OAuth2Client } from "google-auth-library";


const usersRouter = express.Router();

usersRouter.post("/", imagesUpload.single("avatar"), async (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    avatar: req.file ? "images/" + req.file.filename : null,
    displayName: req.body.displayName,
  };

  try {
    const user = new User(data);
    user.generateAuthToken();
    const saveUser = await user.save();

    res.cookie("token", saveUser.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Защита от CSRF (Cross site request forgery),
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    });

    return res.send({ user, message: "Register new user" });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return res.status(400).send(err);
    }
    return next(err);
  }
});

// google register
usersRouter.post("/google", async (req, res, next) => {
  try {
    if (!req.body.credential)
      return res.status(400).send({ error: "Credential is required" });
    const client = new OAuth2Client(config.clientID);

    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.clientID,
    });

    const payload = ticket.getPayload();

    if (!payload) return res.status(400).send({ error: "Google login error" });

    const email = payload.email;
    const id = payload.sub; // googleID
    const displayName = payload.name;

    if (!email)
      return res
        .status(400)
        .send({ error: "Not enough information from Google" });

    let user = await User.findOne({ googleID: id });

    if (!user) {
      const generatePassword = crypto.randomUUID();
      user = new User({
        email: email,
        password: generatePassword,
        googleID: id,
        displayName,
      });
    }

    user.generateAuthToken();
    const userSave = await user.save();

    res.cookie("token", userSave.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    });

    res.send({ message: "Logged in with Google successfully", user });
  } catch (e) {
    next(e);
  }
});

usersRouter.post("/sessions", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).send({ error: "user does not exist" });
      return;
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      res.status(400).send({ error: "password not valid" });
      return;
    }

    user.generateAuthToken();
    await user.save();

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Защита от CSRF (Cross site request forgery),
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    });

    return res.send({ user, message: "Login user" });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return res.status(400).send(err);
    }
    return next(err);
  }
});

// logout
usersRouter.delete("/sessions", async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({ token: refreshToken });
      if (user) {
        user.token = "";
        await user.save();
      }
    }

    res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
    return res.send({ message: "Logged out successfully" });
  } catch (e) {
    next(e);
  }
});


export default usersRouter;
