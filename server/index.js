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

const { auth } = require("./middleware/auth");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send(`Hell'o World!`));

app.get('/api/hello',(req,res)=>{
  res.send("안녕???")
})

app.post("/api/users/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const userInfo = await user.save();
    return res.status(200).json({
      registerSuccess: true,
    });
  } catch (err) {
    return res.json({ registerSuccess: false, err });
  }
});

app.post("/api/users/login", async (req, res) => {
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

    res.cookie("x_auth", user.token).status(200).json({
      loginSuccess: true,
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ loginSuccess: false, message: "Internal Server Error" });
  }
});

app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

app.listen(port, () => console.log(`port${port}`));
