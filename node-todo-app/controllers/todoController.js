const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://pawan:pawan@cluster0.rkmqztp.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const todoSchema = new mongoose.Schema({
  item: String,
});

const Todo = mongoose.model("Todo", todoSchema);

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", (req, res) => {
    Todo.find({})
      .then((resp) => {
        res.render("todo", { todos: resp });
      })
      .catch((err) => {
        throw err;
      });
  });

  app.post("/todo", urlEncodedParser, (req, res) => {
    const newItem = new Todo(req.body);
    newItem
      .save()
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        throw err;
      });
  });

  app.delete("/todo/:item", (req, res) => {
    Todo.find({ item: req.params.item.replace(/\-/g, " ") })
      .deleteOne()
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        throw err;
      });
  });
};
