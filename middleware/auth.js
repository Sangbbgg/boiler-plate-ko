const { User } = require("../models/User");

const auth = (req, res, next) => {
  //인증처리 부문
  // 클라이언트 쿠키에서 토큰 획득
  const token = req.cookies.x_auth;
  // 토큰 복호화 후 유저 서치
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });
  // 유저가 있다면 true
  // 유저가 없으면 false
};

module.exports = { auth };
