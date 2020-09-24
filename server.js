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

app.post("/messages", function (req, res) {
  const newMessage = req.body;
  console.log(newMessage);
  messages.push(newMessage);
  res.send(newMessage);
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

// this is a trivial implementation
app.use((err, req, res, next) => {
  // you can error out to stderr still, or not; your choice
  console.error(err);

  // body-parser will set this to 400 if the json is in error
  if (err.status === 400)
    return res.status(err.status).send("Dude, you messed up the JSON");

  return next(err); // if it's not a 400, let the default error handling do it.
});

app.listen(3000, () => {
  console.log("I'm listening");
});
