import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
let listItems = [];
const __dirname = dirname(fileURLToPath(import.meta.url));
let checkedItems = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs", { items: listItems, checked: checkedItems });
});

app.post("/", (req, res) => {
  if (req.body.editItem) {
    const index = listItems.indexOf(req.body.originalItem);
    listItems[index] = req.body.editItem;
  } else {
    listItems.push(req.body["listItem"]);
  }
  res.render(__dirname + "/views/index.ejs", {
    items: listItems,
    checked: checkedItems
  });
});

app.post("/delete", (req, res) => {
  const deleted = req.body.itemDeleted;
  const index = listItems.indexOf(deleted);
  listItems.splice(index, 1);
  res.redirect("/");
});

app.post("/close", (req, res) => {
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const edited = req.body.itemEdited;
  res.render(__dirname + "/views/index.ejs", {
    editItem: edited,
    items: listItems,
  });
});

app.post("/checked", (req, res) => {
  if (req.body.checkbox) {
    checkedItems.push(req.body.checkbox);
  }
  const checked = req.body.checkbox;
  const index = listItems.indexOf(checked);
  listItems.splice(index, 1);
  res.render(__dirname + "/views/index.ejs", {
    items: listItems,
    checked: checkedItems,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
