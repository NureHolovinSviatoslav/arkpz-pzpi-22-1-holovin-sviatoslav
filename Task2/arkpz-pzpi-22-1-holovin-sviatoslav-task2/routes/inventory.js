'use strict';

const { Inventory } = require('../models/Inventory');
const express = require('express');
const { InventoryItem } = require('../models/InventoryItem');

const router = express.Router();

const getAll = async (req, res) => {
  try {
    const inventories = await Inventory.findAll();
    res.send(inventories);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const inventory = await Inventory.findByPk(parseInt(id));
    if (!inventory) {
      return res.status(404).send('Inventory not found');
    }
    res.send(inventory);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const add = async (req, res) => {
  const inventoryData = { ...req.body };

  try {
    const inventory = await Inventory.create(inventoryData);
    res.status(201).send(inventory);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const inventoryData = { ...req.body };

  try {
    await Inventory.update(inventoryData, {
      where: { inventory_id: parseInt(id) },
    });
    const inventory = await Inventory.findByPk(parseInt(id));
    if (!inventory) {
      return res.status(404).send('Inventory not found');
    }
    res.send(inventory);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await InventoryItem.destroy({ where: { inventory_id: parseInt(id) } });
    const deleted = await Inventory.destroy({
      where: { inventory_id: parseInt(id) },
    });
    if (!deleted) {
      return res.status(404).send('Inventory not found');
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
