const express = require("express");
const inventoryRoutes = express.Router();
const Item = require("../models/Item");
const Location = require("../models/Location");
const Inventory = require("../models/Inventory");

inventoryRoutes.post("/inventory/create", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.body.item_id });
  const location_exist = await Location.exists({
    location_id: req.body.location_id,
  });
  const inventory_exist = await Inventory.exists({
    item_id: req.body.item_id,
    location_id: req.body.location_id,
  });

  let newInventory = null;

  if (item_exist && location_exist && !inventory_exist) {
    newInventory = await Inventory.create({
      item_id: req.body.item_id,
      location_id: req.body.location_id,
    });
  }
  res.send({
    item_exist: item_exist,
    location_exist: location_exist,
    inventory_exist: inventory_exist,
    inventory: newInventory,
  });
});

inventoryRoutes.get("/inventory/get/items", async (req, res) => {
  const location_exist = await Location.exists({
    store_id: req.query.store_id,
  });

  let items;

  if (location_exist) {
    items = await Inventory.find(
      { store_id: req.query.store_id },
      { _id: 0, __v: 0 }
    );
  }

  res.send({ location_exist: location_exist, items: items });
});

inventoryRoutes.get("/inventory/get/locations", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.query.item_id });

  let locations;

  if (item_exist) {
    locations = await Inventory.find({ item_id: req.query.item_id });
  }

  res.send({ item_exist: item_exist, locations: locations });
});

inventoryRoutes.get("/inventory/get/availability", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.query.item_id });
  const location_exist = await Location.exists({
    location_id: req.query.location_id,
  });

  let inventory;

  if (item_exist && location_exist) {
    inventory = await Inventory.findOne({
      item_id: req.query.item_id,
      location_id: req.query.location_id,
    });
  }

  res.send({
    item_exist: item_exist,
    location_exist: location_exist,
    inventory: inventory,
  });
});

inventoryRoutes.post("/inventory/set/availability", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.body.item_id });
  const location_exist = await Location.exists({
    location_id: req.body.location_id,
  });
  const inventory_exist = await Inventory.exists({
    item_id: req.body.item_id,
    location_id: req.body.location_id,
  });

  let updatedInventory = null;

  if (inventory_exist) {
    await Inventory.updateOne(
      {
        item_id: req.body.item_id,
        location_id: req.body.location_id,
      },
      {
        $set: {
          item_count: req.body.item_count,
          updated_at: Date.now(),
        },
      }
    );

    updatedInventory = await Inventory.findOne({
      item_id: req.body.item_id,
      location_id: req.body.location_id,
    });
  }

  res.send({
    item_exist: item_exist,
    location_exist: location_exist,
    inventory_exist: inventory_exist,
    updatedInventory: updatedInventory,
  });
});

inventoryRoutes.post("/inventory/adjust/availability", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.body.item_id });
  const location_exist = await Location.exists({
    location_id: req.body.location_id,
  });
  const inventory_exist = await Inventory.exists({
    item_id: req.body.item_id,
    location_id: req.body.location_id,
  });

  let updatedInventory = null;
  let adjust_exceeded = false;
  let old_item_count = null;

  if (inventory_exist) {
    const currInventory = await Inventory.findOne({
      item_id: req.body.item_id,
      location_id: req.body.location_id,
    });

    old_item_count = currInventory.item_count;
    var adjusted_item_count =
      Number(old_item_count) + Number(req.body.adjustment);

    if (adjusted_item_count >= 0) {
      await Inventory.updateOne(
        {
          item_id: req.body.item_id,
          location_id: req.body.location_id,
        },
        {
          $set: {
            item_count: adjusted_item_count,
            updated_at: Date.now(),
          },
        }
      );
      updatedInventory = await Inventory.findOne({
        item_id: req.body.item_id,
        location_id: req.body.location_id,
      });
    } else {
      adjust_exceeded = true;
    }
  }

  res.send({
    item_exist: item_exist,
    location_exist: location_exist,
    inventory_exist: inventory_exist,
    updatedInventory: updatedInventory,
    adjust_exceeded: adjust_exceeded,
    old_item_count: old_item_count,
  });
});

inventoryRoutes.post("/inventory/delete", async (req, res) => {
  const item_exist = await Item.exists({ item_id: req.query.item_id });
  const location_exist = await Location.exists({
    location_id: req.query.location_id,
  });
  const inventory_exist = await Inventory.exists({
    item_id: req.body.item_id,
    location_id: req.body.location_id,
  });

  if (item_exist && location_exist) {
    await Inventory.deleteOne({
      item_id: req.query.item_id,
      location_id: req.query.location_id,
    });
  }

  res.send({
    item_exist: item_exist,
    location_exist: location_exist,
    inventory_exist: inventory_exist,
  });
});

module.exports = inventoryRoutes;
