import { Request, Response } from "express";
import  User  from "../models/user";
import config from "../config";
import jwt from "jwt-simple";

// ideally we should refactor this code to use async/await, 
//and not handle any of the http response codes or req/res in the controller
//and instead handle that in the route, that way we can test the controller
//and call the functions from other controllers
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

const profile = function(req : Request, res : Response) {
  res.json({
    message: 'You made it to the secured profile',
    user: req.user,
    token: req.query.secret_token
  })
}

const update = function(req : Request, res : Response) {
   const userId = req.body.userId;

   // Check if the ID is valid
   if (!userId) {
     return res.status(400).json({ message: "Invalid user ID" });
   }

   const updateFields = {
     email: req.body.email,
     username: req.body.username,
   };
   
   // Find user by userId
   User.findOneAndUpdate({ _id: userId }, updateFields, { new: true })
     .then((updatedUser) => {
       if (!updatedUser) {
         return res.status(404).json({ message: "User not found" });
       }
 
       res.json({ message: "User updated successfully", user: updatedUser });
     })
     .catch((err) => {
       console.error("Error:", err);
       res.status(500).json({ message: "Internal Server Error" });
     });
}

export default {
  login,
  register,
  profile,
  update
};