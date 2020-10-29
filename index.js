const { json } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const verifyToken = (req, res, next) => {
  if (
    typeof req.headers["authorization"] != undefined &&
    req.headers["authorization"]
  ) {
    let tokenHeader = req.headers["authorization"].split(" ")[1];
    console.log(tokenHeader);
    if (tokenHeader) {
      req.token = tokenHeader;
      next();
    } else {
      res.json({
        msg: "Unauthorized",
      });
    }
  } else {
    res.json({
      msg: "Unauthorized",
    });
  }
};

app.get("/login", (req, res) => {
  const userData = {
    id: 1,
    username: "Nimesha Edirisinghe",
    age: 26,
  };
  jwt.sign({ user: userData }, "secretKey", (err, token) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        token: token,
      });
    }
  });
});

app.post("/save", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", function (err, decoded) {
    if (err) {
      res.json({
        msg: "Access denied",
      });
    } else {
      res.json({
        msg: "Data Saved",
        data: decoded,
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is listening port 3000...");
});