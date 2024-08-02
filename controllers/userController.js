const User = require('../models/userModel');

exports.createUser = (req, res) => {
  const userData = req.body;
  User.create(userData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: result.insertId, ...userData });
  });
};

exports.getUserByUsername = (req, res) => {
  const username = req.params.username;
  User.findByUsername(username, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(result[0]);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(result[0]);
  });
};