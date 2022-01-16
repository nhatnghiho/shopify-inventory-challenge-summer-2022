const express = require("express");
const itemRoutes = express.Router();
const Item = require("../models/Item");
const Location = require("../models/Location");
const Inventory = require("../models/Inventory");

itemRoutes.post("/items/create", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.body.item_id });

  let newItem = null;

  if (!item_exist) {
    newItem = await Item.create({
      item_id: req.body.item_id,
      item_name: req.body.item_name,
      sku: req.body.sku,
      cost: req.body.cost,
    });
  }

  res.send({ item_exist: item_exist, item: newItem });
});

itemRoutes.get("/items/get/all", async (req, res) => {
  const items = await Item.find();
  res.send({ items: items });
});

itemRoutes.get("/items/get", async (req, res) => {
  const location_exist = await Location.exists({
    location_id: req.query.location_id,
  });

  let items = null;
  let item_details = null;

  if (location_exist) {
    items = await Inventory.find(
      { location_id: req.query.location_id },
      { _id: 0, __v: 0 }
    );

    const item_ids = items.map((item) => item.item_id);

    item_details = await Item.find(
      { item_id: { $in: item_ids } },
      { _id: 0, __v: 0 }
    );
  }

  res.send({
    location_exist: location_exist,
    location_id: req.query.location_id,
    items: item_details,
  });
});

itemRoutes.get("/items/get/attributes", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.query.item_id });

  let item;

  if (item_exist) {
    item = await Item.findOne(
      { item_id: req.query.item_id },
      { _id: 0, __v: 0 }
    );
  }

  res.send({ item_exist: item_exist, item: item });
});

itemRoutes.post("/items/modify/:item_id", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.body.item_id });

  var toChange = {};
  let updatedItem;
  if (item_exist) {
    Object.keys(req.body).forEach((key) => {
      if (
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        req.body[key] !== ""
      ) {
        toChange[key] = req.body[key];
      }
    });

    toChange.update_at = Date.now();

    await Item.updateOne(
      {
        item_id: req.body.item_id,
      },
      {
        $set: toChange,
      }
    );

    updatedItem = await Item.findOne({ item_id: req.body.item_id });
  }

  res.send({ item_exist: item_exist, updatedItem: updatedItem });
});

itemRoutes.post("/items/delete", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.query.item_id });

  if (item_exist) {
    await Item.deleteOne({ item_id: req.query.item_id });
    await Inventory.deleteMany({ item_id: req.query.item_id });
  }

  res.send({ item_exist: item_exist });
});

module.exports = itemRoutes;
