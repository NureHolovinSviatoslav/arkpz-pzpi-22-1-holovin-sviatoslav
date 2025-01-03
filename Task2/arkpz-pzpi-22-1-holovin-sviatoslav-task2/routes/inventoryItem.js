'use strict';

const { InventoryItem } = require('../models/InventoryItem');
const express = require('express');

const router = express.Router();

const getAll = async (req, res) => {
  try {
    const items = await InventoryItem.findAll();
    res.send(items);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await InventoryItem.findByPk(parseInt(id));
    if (!item) {
      return res.status(404).send('Inventory Item not found');
    }
    res.send(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const add = async (req, res) => {
  const itemData = { ...req.body };

  try {
    const item = await InventoryItem.create(itemData);
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const itemData = { ...req.body };

  try {
    await InventoryItem.update(itemData, {
      where: { inventory_item_id: parseInt(id) },
    });
    const item = await InventoryItem.findByPk(parseInt(id));
    if (!item) {
      return res.status(404).send('Inventory Item not found');
    }
    res.send(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await InventoryItem.destroy({
      where: { inventory_item_id: parseInt(id) },
    });
    if (!deleted) {
      return res.status(404).send('Inventory Item not found');
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
