const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session'); //guarda las sesiones de manera permanente
const crypto=require('cryto')
const bcrypt=require('bcrypt')


import{app} from "./routes/users.js"
import{secret,hashedSecret} from "./crypto/config.js"

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: secret,
    hashedSecret: hashedSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false /*pq estamos trabajando en http, si subimos a produccion para trabajar en https seria true*/,
    },
  })
);


