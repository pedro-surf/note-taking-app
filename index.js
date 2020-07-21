const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

// @route GET /test (testing server)
app.get("/test", async (req, res) => res.json("Hello World"));

// @route   GET /todos
// @desc    Get random todo data
// @access  Public
app.get("/todos", async (req, res) => {
  //const offset = req.query.offset || 20;
  console.log("Called GET Todos");
  const todoData = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos",
    {
      mode: "cors",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.dir(err));
  res.status(200).json({ todos: todoData });
});

// @route   POST /todos
// @desc    Create todo data
// @access  Public
app.post("/todos", async (req, res) => {
  console.log("Called POST Todos");
  const { title, body, userId } = req.body;
  const updateDate = await fetch("https://jsonplaceholder.typicode.com/todos", {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((r) => r.json())
    .catch((err) => console.dir(err)); // Output
  /*{
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1
}*/
  res.json({ todo: updateDate });
});

// @route   PUT /todos
// @desc    update todo data
// @access  Public
app.put("/todos", async (req, res) => {
  console.log("Called PUT Todos");
  const { id, title, userId } = req.body;
  const fakeId = id > 100 ? 1 : id; // Our mock API doesnt seem to like an ID greater than ~100
  const updateDate = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${fakeId}`,
    {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({
        id: fakeId,
        title,
        userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((r) => r.json())
    .catch((err) => console.dir(err));

  res.json({
    todo: {
      ...updateDate,
      id,
    },
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
