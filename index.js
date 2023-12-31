const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sangbbgg:1q2w3e4r@atlascluster.hhjgq4h.mongodb.net/"
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send(`Hell'o World!123`));

app.listen(port, () => console.log(`port${port}`));
