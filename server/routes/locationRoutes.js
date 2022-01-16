const express = require("express");
const locationRoutes = express.Router();
const Item = require("../models/Item");
const Location = require("../models/Location");
const Inventory = require("../models/Inventory");

locationRoutes.post("/locations/create", async (req, res) => {
  const location_exist = await Location.exists({
    location_id: req.body.location_id,
  });

  let newLocation = null;

  if (!location_exist) {
    newLocation = await Location.create({
      location_id: req.body.location_id,
      location_name: req.body.location_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zip: req.body.zip,
    });
  }
  res.send({ location_exist: location_exist, location: newLocation });
});

locationRoutes.get("/locations/get/all", async (req, res) => {
  const locations = await Location.find();
  res.send({ locations: locations });
});

locationRoutes.get("/locations/get", async (req, res) => {
  const item_exist = await Item.exists({
    item_id: req.query.item_id,
  });

  let locations = null;
  let location_details = null;

  if (item_exist) {
    locations = await Inventory.find(
      { item_id: req.query.item_id },
      { _id: 0, __v: 0 }
    );

    const location_ids = locations.map((location) => location.location_id);

    location_details = await Location.find(
      { location_id: { $in: location_ids } },
      { _id: 0, __v: 0 }
    );
  }

  res.send({
    item_exist: item_exist,
    item_id: req.query.item_id,
    locations: location_details,
  });
});

locationRoutes.get("/locations/get/attributes", async (req, res) => {
  const location_exist = await Location.exists({
    location_id: req.query.location_id,
  });

  let location;

  if (location_exist) {
    location = await Location.findOne(
      { location_id: req.query.location_id },
      { _id: 0, __v: 0 }
    );
  }

  res.send({ location_exist: location_exist, location: location });
});

locationRoutes.post("/locations/modify/:location_id", async (req, res) => {
  const location_exist = await Location.exists({
    location_id: req.body.location_id,
  });

  let toChange = {};
  let updatedLocation;

  if (location_exist) {
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

    await Location.updateOne(
      {
        location_id: req.body.location_id,
      },
      {
        $set: toChange,
      }
    );

    updatedLocation = await Location.findOne({
      location_id: req.body.location_id,
    });
  }

  res.send({
    location_exist: location_exist,
    updatedLocation: updatedLocation,
  });
});

locationRoutes.post("/locations/delete", async (req, res) => {
  const location_exist = await Location.exists({
    location_id: req.query.location_id,
  });

  if (location_exist) {
    await Location.deleteOne({ location_id: req.query.location_id });
    await Inventory.deleteMany({ location_id: req.query.location_id });
  }

  res.send({ location_exist: location_exist });
});

module.exports = locationRoutes;
