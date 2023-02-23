const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("db connected");
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

// CRUD - Create
server.post("/demo", async (req, res) => {
  let user = new User();
  const { name, email, query } = req.body;
  if (!name || !email || !query) {
    return res.status(400).json({ message: "Fuck you!" });
  }
  try {
    user.name = name;
    user.email = email;
    user.query = query;
    const doc = await user.save();
    return res.json(doc);
  } catch (error) {
    return res.status(500).json({ message: "Its not you...its me" });
  }
});

server.get("/demo", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
}); 

server.listen(process.env.PORT || 8080, () => {
  console.log("server started");
});
