import { Request, Response } from "express";
import  User  from "../models/user";
import config from "../config";
import jwt from "jwt-simple";

const login = function (req: Request, res: Response) {
  User.findOne({ username: req.body.username }).exec()  
    .then((user: any) => {
      if (!user) { 
        return res.status(404).json({ message: "User not found" });
      }

      var payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      };

      var token;
      if (config.jwtSecret) { // if it exists 
        // Pass { session: false } as an option to indicate that sessions are not needed
        token = jwt.encode(payload, config.jwtSecret);
      }

      res.json({ token: token });
    }).catch((err: Error) => {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const register = function (req : Request, res : Response) {
  User.register(
    new User({ 
      email: req.body.email,
      username: req.body.username 
    }), req.body.password, function (err : Error, msg : String) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};

const profile = function(req : any, res : Response) {
  res.json({
    message: 'You made it to the secured profile',
    user: req.user,
    token: req.query.secret_token
  })
}

export default {
  login,
  register,
  profile,
};