const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

const databaseUrl = "fitnessMonitor";
const collections = ["exercises"];

const db = mongojs(databaseUrl, collections);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

app.use(require("./routes/html-routes.js"));
app.use(require("./routes/api-routes.js"));

db.on("error", error => {
    console.log("Database Error:", error);
});
  
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
