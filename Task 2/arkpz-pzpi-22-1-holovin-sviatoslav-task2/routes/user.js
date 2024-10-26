'use strict';

const { User } = require('../models/User');
const { Notification } = require('../models/Notification');
const express = require('express');
const { Order } = require('../models/Order');

const router = express.Router();

const getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password_hash'] },
    });
    res.send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getOne = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findByPk(username, {
      attributes: { exclude: ['password_hash'] },
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const add = async (req, res) => {
  const userData = { ...req.body };

  try {
    const user = await User.create(userData);
    res.status(201).send({
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const update = async (req, res) => {
  const { username } = req.params;
  const userData = { ...req.body };

  try {
    await User.update(userData, {
      where: { username },
    });
    const user = await User.findByPk(username, {
      attributes: { exclude: ['password_hash'] },
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const remove = async (req, res) => {
  const { username } = req.params;

  try {
    await Notification.destroy({ where: { username } });
    await Order.destroy({ where: { username } });
    const deleted = await User.destroy({
      where: { username },
    });
    if (!deleted) {
      return res.status(404).send('User not found');
    }
    res.status(204).send({});
  } catch (err) {
    res.status(400).send(err.message);
  }
};

router.get('/', getAll);
router.get('/:username', getOne);
router.post('/', add);
router.patch('/:username', update);
router.delete('/:username', remove);

module.exports = { router };
