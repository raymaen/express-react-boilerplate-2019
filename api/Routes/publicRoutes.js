const express = require("express");
const router = express.Router();
const Service = require("../Models/Service");
// @route   GET /api/public/services
// @desc    Returns all services
// @access  Public

router.get("/services", async (req, res) => {
  try {
    const services = await Service.find({});
    res.json({ services });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("sections");
    res.json({ service });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
