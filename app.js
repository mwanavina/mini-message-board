const path = require("node:path");
const express = require("express");

const app = express();

const messages = [
  {
    id: 0,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages });
});

app.get("/new", (req, res) => {
  res.render("form", { title: "New message" });
});

app.post("/new", (req, res) => {
  const message = {
    id: messages.length,
    text: req.body.messageText,
    user: req.body.messageUser,
    added: new Date()
  };

  messages.push(message);
  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const message = messages[Number(req.params.id)];

  if (!message) {
    res.status(404).send("Message not found");
    return;
  }

  res.render("message", { title: "Message details", message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});