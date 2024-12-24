'use strict';

const { Inventory } = require('../models/Inventory');
const { Location } = require('../models/Location');
const { SensorData } = require('../models/SensorData');
const express = require('express');

const router = express.Router();

const getAll = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.send(locations);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await Location.findByPk(parseInt(id));
    if (!location) {
      return res.status(404).send('Location not found');
    }
    res.send(location);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const add = async (req, res) => {
  const locationData = { ...req.body };

  try {
    const location = await Location.create(locationData);
    res.status(201).send(location);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const locationData = { ...req.body };

  try {
    await Location.update(locationData, {
      where: { location_id: parseInt(id) },
    });
    const location = await Location.findByPk(parseInt(id));
    if (!location) {
      return res.status(404).send('Location not found');
    }
    res.send(location);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await Inventory.destroy({
      where: { location_id: parseInt(id) },
    });
    await SensorData.destroy({
      where: { location_id: parseInt(id) },
    });
    const deleted = await Location.destroy({
      where: { location_id: parseInt(id) },
    });
    if (!deleted) {
      return res.status(404).send('Location not found');
    }
    res.status(204).send({});
  } catch (err) {
    res.status(400).send(err.message);
  }
};

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', add);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = { router };
