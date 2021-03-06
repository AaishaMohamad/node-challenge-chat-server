const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.send("Welcome to chatterbox!");
});

app.get("/messages", function (request, response) {
  response.send(messages);
});

app.get("/messages/latest", function (req, res) {
  console.log(messages.slice(-10));
  res.send(messages.slice(-10));
});

app.get("/messages/search", function (req, res) {
  const queryParam = req.query.text;
  const theMessage = messages.filter((message) =>
    message.text.includes(queryParam)
  );
  res.send(theMessage);
});

app.post("/messages", function (req, res) {
  const newMessage = req.body;
  console.log(newMessage.text);
  console.log(newMessage);
  messages.push(newMessage);
  if (!newMessage.text || !newMessage.from) {
    res.status(400).send("something's wrong");
  } else {
    res.send(newMessage);
  }
});

app.get("/messages/:messageId", function (req, res) {
  const theMessageId = parseInt(req.params.messageId);
  console.log(typeof theMessageId);
  const findMessage = messages.find((message) => message.id === theMessageId);
  res.send(findMessage);
});

app.delete("/messages/:messageId", function (req, res) {
  const theMessageId = parseInt(req.params.messageId);
  const messageToDelete = messages.find(
    (message) => message.id === theMessageId
  );
  console.log(messageToDelete);
  const indexOfMessage = messages.indexOf(messageToDelete);
  messages.splice(indexOfMessage, 1);
  res.send(messageToDelete);
});

app.listen(3000, () => {
  console.log("I'm listening");
});
