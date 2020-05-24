const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employees',
  },
  name: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    default: 'uncompleted',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('project', ProjectSchema);
