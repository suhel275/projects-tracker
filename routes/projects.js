const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Employee = require('../models/Employee');
const Project = require('../models/Project');

//Get all employees projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ employee: req.employee.id }).sort({
      date: -1,
    });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new project
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, client, email, phone, status } = req.body;

    try {
      const newProject = new Project({
        name,
        client,
        email,
        phone,
        status,
        employee: req.employee.id,
      });

      const project = await newProject.save();

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Update project
router.put('/:id', auth, async (req, res) => {
  const { name, client, email, phone, status } = req.body;

  // Build project object
  const projectFields = {};
  if (name) projectFields.name = name;
  if (client) projectFields.client = client;
  if (email) projectFields.email = email;
  if (phone) projectFields.phone = phone;
  if (status) projectFields.status = status;

  try {
    let project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // Make sure employee owns project
    if (project.employee.toString() !== req.employee.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Project.findByIdAndRemove(req.params.id);

    res.json({ msg: 'project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
