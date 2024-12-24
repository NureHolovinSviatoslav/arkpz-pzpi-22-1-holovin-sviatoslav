'use strict';

const { SensorData } = require('../models/SensorData');
const express = require('express');

const router = express.Router();

const getAll = async (req, res) => {
  try {
    const data = await SensorData.findAll();
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const sensorData = await SensorData.findByPk(parseInt(id));
    if (!sensorData) {
      return res.status(404).send('Sensor Data not found');
    }
    res.send(sensorData);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const add = async (req, res) => {
  const data = { ...req.body };

  try {
    const sensorData = await SensorData.create(data);
    res.status(201).send(sensorData);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', add);

module.exports = { router };
