require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Task = require("./models/Task");

const app = express();
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Auth middleware
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Invalid token" });
  }
}



// Signup
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashed });
  res.json({ msg: "Signup success" });
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});



// Get profile
app.get("/api/profile", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// Update profile
app.put("/api/profile", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    req.body,
    { new: true }
  ).select("-password");

  res.json(user);
});


// List tasks
app.get("/api/tasks", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Create task
app.post("/api/tasks", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    userId: req.userId
  });
  res.json(task);
});

// Update task
app.put("/api/tasks/:id", auth, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete task
app.delete("/api/tasks/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ msg: "Deleted" });
});

// Server
app.listen(5000, () => console.log("API running on 5000"));
