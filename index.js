// const db = require("db");
const express = require("express");
const app = express();
const Pokemon = require("./Pokemon");
const axios = require("axios");
app.get("/", async (req, res) => {});

app.listen(8000, () => {
  console.log("listening for requests on port 8000");
});
