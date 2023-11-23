const express = require('express');
const { register, login } = require('../models/users');

const router = express.Router();

/* Register a user */
router.post('/register', async (req, res) => {
  const firstname = req?.body?.firstname?.length !== 0 ? req.body.firstname : undefined;
  const lastname = req?.body?.lastname?.length !== 0 ? req.body.lastname : undefined;
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!email || !password || !firstname || !lastname ) return res.sendStatus(400); // 400 Bad Request

  const authenticatedUser = await register(firstname, lastname, email, password);

  if (!authenticatedUser) return res.sendStatus(401); // 409 Conflict

  return res.json(authenticatedUser);
});

/* Login a user */
router.post('/login', async (req, res) => {
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!email || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser = await login(email, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized


  return res.json(authenticatedUser);
});

module.exports = router;
