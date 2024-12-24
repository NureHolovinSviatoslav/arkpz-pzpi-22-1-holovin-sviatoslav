'use strict';

const { InventoryItem } = require('../models/InventoryItem');
const { OrderItem } = require('../models/OrderItem');
const { Vaccine } = require('../models/Vaccine');
const express = require('express');

const router = express.Router();

const getAll = async (req, res) => {
  try {
    const vaccines = await Vaccine.findAll();
    res.send(vaccines);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const vaccine = await Vaccine.findByPk(parseInt(id));
    if (!vaccine) {
      return res.status(404).send('Vaccine not found');
    }
    res.send(vaccine);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const add = async (req, res) => {
  const vaccineData = { ...req.body };

  try {
    const vaccine = await Vaccine.create(vaccineData);
    res.status(201).send(vaccine);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const vaccineData = { ...req.body };

  try {
    await Vaccine.update(vaccineData, {
      where: { vaccine_id: parseInt(id) },
    });
    const vaccine = await Vaccine.findByPk(parseInt(id));
    if (!vaccine) {
      return res.status(404).send('Vaccine not found');
    }
    res.send(vaccine);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await InventoryItem.destroy({ where: { vaccine_id: parseInt(id) } });
    await OrderItem.destroy({ where: { vaccine_id: parseInt(id) } });
    const deleted = await Vaccine.destroy({
      where: { vaccine_id: parseInt(id) },
    });
    if (!deleted) {
      return res.status(404).send('Vaccine not found');
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
