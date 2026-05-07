import express from "express";

import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});


// GET CURRENT USER
router.get(
  "/me",
  authMiddleware,
  async (req, res) => {
    try {

      const user =
        await User.findById(req.user.id)
          .select("-password");

      res.json({ user });

    } catch (err) {

      res.status(500).json({
        message: "Server error",
      });

    }
  }
);


// UPDATE PROFILE
router.put(
  "/update",
  authMiddleware,
  upload.single("profilePic"),
  async (req, res) => {
    try {

      const {
        name,
        phone,
        bio,
      } = req.body;

      let profilePic = "";

      // UPLOAD IMAGE TO CLOUDINARY
      if (req.file) {

        const base64 =
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const uploadResponse =
          await cloudinary.uploader.upload(base64, {
            folder: "profile_pics",
          });

        profilePic =
          uploadResponse.secure_url;
      }

      const updateData = {
        name,
        phone,
        bio,
      };

      // ONLY UPDATE IMAGE
      // IF NEW IMAGE EXISTS
      if (profilePic) {
        updateData.profilePic =
          profilePic;
      }

      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          updateData,
          { new: true }
        );

      // ACTIVITY LOG
      await ActivityLog.create({
        action: "PROFILE_UPDATE",
        performedBy: req.user.id,
        targetUser: user._id,
        details:
          `${user.name} updated profile`,
      });

      res.json({
        message: "Profile updated",
        user,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Update failed",
      });

    }
  }
);


// ADMIN TEST ROUTE
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {

    res.json({
      message: "Welcome Admin 🔥",
      user: req.user,
    });

  }
);


// GET USERS WITH
// SEARCH + FILTER + PAGINATION
router.get(
  "/all-users",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {

      const page =
        Number(req.query.page) || 1;

      const limit = 5;

      const search =
        req.query.search || "";

      const role =
        req.query.role || "";

      const query = {};

      // SEARCH
      if (search) {

        query.$or = [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: search,
              $options: "i",
            },
          },
        ];

      }

      // FILTER
      if (
        role &&
        role !== "all"
      ) {
        query.role = role;
      }

      const totalUsers =
        await User.countDocuments(query);

      const users =
        await User.find(query)
          .select("-password")
          .skip((page - 1) * limit)
          .limit(limit);

      res.json({
        users,
        currentPage: page,
        totalPages:
          Math.ceil(totalUsers / limit),
      });

    } catch (err) {

      res.status(500).json({
        message: "Failed to fetch users",
      });

    }
  }
);


// DELETE USER
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {

      const user =
        await User.findById(req.params.id);

      await User.findByIdAndDelete(
        req.params.id
      );

      // ACTIVITY LOG
      await ActivityLog.create({
        action: "DELETE_USER",
        performedBy: req.user.id,
        targetUser: user._id,
        details: `Deleted ${user.name}`,
      });

      res.json({
        message: "User deleted",
      });

    } catch (err) {

      res.status(500).json({
        message: "Delete failed",
      });

    }
  }
);


// CHANGE ROLE
router.put(
  "/role/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {

      const { role } = req.body;

      const user =
        await User.findByIdAndUpdate(
          req.params.id,
          { role },
          { new: true }
        );

      // ACTIVITY LOG
      await ActivityLog.create({
        action: "ROLE_CHANGE",
        performedBy: req.user.id,
        targetUser: user._id,
        details:
          `${user.name} role changed to ${role}`,
      });

      res.json({
        message: "Role updated",
        user,
      });

    } catch (err) {

      res.status(500).json({
        message: "Role update failed",
      });

    }
  }
);


// ANALYTICS
router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {

      const totalUsers =
        await User.countDocuments();

      const totalAdmins =
        await User.countDocuments({
          role: "admin",
        });

      const normalUsers =
        await User.countDocuments({
          role: "user",
        });

      res.json({
        totalUsers,
        totalAdmins,
        normalUsers,
      });

    } catch (err) {

      res.status(500).json({
        message: "Analytics failed",
      });

    }
  }
);


// GET ACTIVITY LOGS
router.get(
  "/activity-logs",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {

      const logs =
        await ActivityLog.find()
          .sort({ createdAt: -1 })
          .limit(20);

      res.json(logs);

    } catch (err) {

      res.status(500).json({
        message: "Failed to fetch logs",
      });

    }
  }
);

export default router;