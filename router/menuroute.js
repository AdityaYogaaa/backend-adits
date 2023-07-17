const express = require("express");
const router = express.Router();
const menuController = require("../controller/menucontroller");
const isAuthenticated = require("../middleware/authmiddleware");

// Create a new menu
router.post("/", menuController.createMenu);

// Get a menu by ID
router.get("/:id", menuController.getMenuById);

// Get all menus
router.get("/", isAuthenticated, menuController.getAllMenus);

// Update a menu by ID
router.put("/:id", menuController.updateMenu);

// Delete a menu by ID
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
