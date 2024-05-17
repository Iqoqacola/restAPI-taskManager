const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask
} = require("../controllers/taskController");
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//GET all task
router.get("/", getTasks);

//GET a single task
router.get("/:id", getTask);

//POST a new task
router.post("/", createTask);

//DELETE a task
router.delete("/:id", deleteTask);

//UPDATE a task
router.patch("/:id", updateTask);

module.exports = router;
