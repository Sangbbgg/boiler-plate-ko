const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const cookieParser = require("cookie-parser");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send(`Hell'o World!`));

app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const userInfo = await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

app.post("/login", async (req, res) => {
  try {
    // Find the user with the provided email
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, wrong password",
      });

    // Generate a token and store it in cookies
    await user.generateToken();
    
    res
      .cookie("x_auth", user.token)
      .status(200)
      .json({
        loginSuccess: true,
        userId: user._id,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ loginSuccess: false, message: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`port${port}`));
