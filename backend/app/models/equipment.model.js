const mongoose = require("mongoose");

const Equipment = mongoose.model(
  "Equipment",
  new mongoose.Schema(
    {
      IdUser: String,
      EquipmentName: String,
      EquipmentDescription: String,
    },
    {
      versionKey: false,
      // _id: false,
    }
  )
);

module.exports = Equipment;
