const express = require("express");
const router = express.Router();
const Service = require("../Models/Service");
const Section = require("../Models/Section");

/*
.
.
@Services
.
.
*/

// @route   POST /api/admin/service
// @params  title, category, descriptipon , example
// @desc    Creates a new service
// @access  Private
router.post("/service", (req, res) => {
  if (!req.body.title)
    return res.status(400).json({ err: "Must provide a title" });

  Service.create({
    title: req.body.title,
    category: req.body.category | "",
    description: req.body.description | "",
    example: req.body.example | ""
  })
    .then(() => res.json({ msg: "Success" }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: "Server error" });
    });
});

// @route   PUT /api/admin/service/:id
// @params  title, category, descriptipon , example
// @desc    Edit an existing service
// @access  Private
router.put("/service/:id", (req, res) => {
  if (!req.body.title || !req.params.id)
    return res.status(400).json({ err: "Must provide a title" });

  Service.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    category: req.body.category | "",
    description: req.body.description | "",
    example: req.body.example | ""
  })
    .then(() => res.json({ msg: "Success" }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: "Server error" });
    });
});

// @route   DELETE /api/admin/service/:id
// @desc    Remove Service (use safe)
// @access  Private
router.delete("/service/:id", (req, res) => {
  Service.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Success" }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: "Server error" });
    });
});

/*
.
.
@Sections
.
.
*/

// @route   POST /api/admin/section/:serviceId
// @params  serviceId - service id
// @desc    Adds a new section to an existing service
// @access  Private
router.post("/section/:serviceId", async (req, res) => {
  if (!req.body.title)
    return res.status(400).json({ err: "Must provide a title" });

  try {
    const service = await Service.findById(req.params.serviceId);
    const newSection = await Section.create({
      title: req.body.title,
      description: req.body.description || "",
      type: req.body.type || "",
      style: req.body.style || ""
    });

    service.sections.push(newSection);

    const result = await service.save();

    res.json({ msg: "Success!", service: result });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// @route   PUT /api/admin/section/:id
// @params  id (title, category, descriptipon , example)
// @desc    Edit a section
// @access  Private
router.put("/section/:id", async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ err: "Must provide a title" });
    const { title, description, type, example, style } = req.body;
    const section = await Section.findByIdAndUpdate(req.params.id, {
      title,
      description,
      type,
      example,
      style
    });
    res.json({ section });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// @route   DELETE /api/admin/section/:serviceId/:sectionId
// @params  serviceId, sectionId
// @desc    Remove Section (use safe)
// @access  Private
router.delete("/section/:serviceId/:sectionId", async (req, res) => {
  try {
    // Remove from service first
    const service = await Service.findById(req.params.serviceId);
    service.sections.filter(sec => sec._id !== req.params.sectionId);
    await service.save();

    // Remove actual section
    await Section.findByIdAndDelete(req.params.sectionId);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
