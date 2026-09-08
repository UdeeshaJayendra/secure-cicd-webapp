const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const User = require("../models/User");

const router = express.Router();

// Get current authenticated user
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "Authenticated user",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

// Admin test
router.get(
  "/admin-test",
  protect,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Admin access granted",
      user: {
        name: req.user.name,
        role: req.user.role,
      },
    });
  }
);

// Get all users - Admin only
router.get(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.status(200).json({
        count: users.length,
        users,
      });
    } catch (error) {
      console.error("Get users error:", error);

      res.status(500).json({
        message: "Server error while fetching users",
      });
    }
  }
);

// Change user role - Admin only
router.patch(
  "/:id/role",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { role } = req.body;

      const allowedRoles = ["admin", "manager", "member"];

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          message: "Invalid role",
        });
      }

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.role = role;
      await user.save();

      res.status(200).json({
        message: "User role updated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        },
      });
    } catch (error) {
      console.error("Update role error:", error);

      res.status(500).json({
        message: "Server error while updating user role",
      });
    }
  }
);
// Activate or deactivate user - Admin only
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { isActive } = req.body;

      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          message: "isActive must be true or false",
        });
      }

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Prevent admin from disabling their own account
      if (
        user._id.toString() === req.user._id.toString() &&
        isActive === false
      ) {
        return res.status(400).json({
          message: "You cannot deactivate your own account",
        });
      }

      user.isActive = isActive;
      await user.save();

      res.status(200).json({
        message: isActive
          ? "User activated successfully"
          : "User deactivated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        },
      });
    } catch (error) {
      console.error("Update user status error:", error);

      res.status(500).json({
        message: "Server error while updating user status",
      });
    }
  }
);

module.exports = router;