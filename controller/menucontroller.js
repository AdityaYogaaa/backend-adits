const Menu = require("../models/menumodel");

// Create a new menu
async function createMenu(req, res) {
  try {
    const { nama, harga, kategori } = req.body;
    const menu = new Menu({ nama, harga, kategori });
    await menu.save();
    res.send("Menu created successfully");
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).send("Error creating menu");
  }
}

// Get a menu by ID
async function getMenuById(req, res) {
  try {
    const menuId = req.params.id;
    const menu = await Menu.findById(menuId);
    if (!menu) {
      res.status(404).send("Menu not found");
    } else {
      res.json(menu);
    }
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).send("Error fetching menu");
  }
}

// Get all menus
async function getAllMenus(req, res) {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).send("Error fetching menus");
  }
}

// Update a menu by ID
async function updateMenu(req, res) {
  try {
    const menuId = req.params.id;
    const updateData = req.body;
    const updatedMenu = await Menu.findByIdAndUpdate(menuId, updateData, { new: true });
    if (!updatedMenu) {
      res.status(404).send("Menu not found");
    } else {
      res.json(updatedMenu);
    }
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).send("Error updating menu");
  }
}

// Delete a menu by ID
async function deleteMenu(req, res) {
  try {
    const menuId = req.params.id;
    const deletedMenu = await Menu.findByIdAndDelete(menuId);
    if (!deletedMenu) {
      res.status(404).send("Menu not found");
    } else {
      res.send("Menu deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).send("Error deleting menu");
  }
}

module.exports = {
  createMenu,
  getMenuById,
  getAllMenus,
  updateMenu,
  deleteMenu,
};
