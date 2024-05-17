const Task = require("../models/taskModel");
const mongoose = require("mongoose");

const noTask = {
  error: "No such task",
};

const getTasks = async (req, res) => {
  const user_id = req.user._id;
  const task = await Task.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(task);
};

const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json(noTask);
  }

  const task = await Task.findById(id);

  if (!task) {
    res.status(404).json(noTask);
  }

  res.status(200).json(task);
};

const createTask = async (req, res) => {
  const { subject, desc, group, due } = req.body;

  let emptyFields = [];

  if (!subject) {
    emptyFields.push('subject');
  }

  if (!desc) {
    emptyFields.push('desc');
  }

  if (!group) {
    emptyFields.push('group');
  }

  if (!due) {
    emptyFields.push('due')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  try {
    const user_id = req.user._id;

    const task = await Task.create({ subject, desc, group, due, user_id });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json(noTask);
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    res.status(404).json(noTask);
  }

  res.status(200).json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json(noTask);
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!task) {
    res.status(404).json(noTask);
  }

  res.status(200).json(task)
};

module.exports = { getTask, createTask, getTasks, deleteTask, updateTask };
