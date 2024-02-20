import { NextFunction, Request, Response } from "express";
import User from "";
import config from "./config.ts";
import jwt from "jwt-simple";

exports.login = function (req : Request, res : Response) {
  User.findOne({ username: req.body.username }, (err : Error, user : any) => {
    if (err) {
      console.log("Error");
    } else {
      var payload = { 
        id: user.id, 
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7 
      }

      var token = jwt.encode(payload, config.jwtSecret)

      res.json({ token: token })
    }
  });
};

exports.register = function (req, res) {
  User.register(
    new User({ 
      email: req.body.email, 
      username: req.body.username 
    }), req.body.password, function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};

exports.profile = function(req : Request, res : Response) {
  res.json({
    message: 'You made it to the secured profile',
    user: req.user,
    token: req.query.secret_token
  })
}