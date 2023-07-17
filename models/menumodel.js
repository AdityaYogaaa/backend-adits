const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  harga: {
    type: String,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
