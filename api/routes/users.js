const express = require('express');

const router = express.Router();

const { getInfoByUserId } = require('../models/users');

router.get('/:id', (req, res) => {
  const foundUser = getInfoByUserId(req.params.id);

  if (!foundUser) return res.sendStatus(404);

  return res.json(foundUser);
});

module.exports = router;
