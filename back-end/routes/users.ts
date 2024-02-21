
import { NextFunction, Request, Response } from "express";
const express = require('express')
const app = express()
const User = require('./models/user')
const accountController = require('./controllers/accountController')
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
import * as dotenv from "dotenv";
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));

require('./middleware/auth.js')()
mongoose.connect(process.env.URI);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
app.use(passport.initialize());

app.get('/', (req : Request, res : Response) => { res.send('Introduction JWT Auth') })
app.get('/profile', passport.authenticate('jwt', { session: false }), accountController.profile)
app.post('/login', passport.authenticate('local'), accountController.login)
app.post('/register', accountController.register)
app.listen(8000, () => { console.log('Server started.') });