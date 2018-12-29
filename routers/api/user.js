// @login and register
const express = require("express");
const router = express.Router();
// @Bcrypt
const bcrypt = require("bcrypt");

// @Models / User
const User = require("../../models/User");
const APIKeys = require("../../models/APIKeys");
// @gravatar
const gravatar = require("gravatar");

// @body-Parser

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// @jwt
const jwt = require("jsonwebtoken");

// @include secret for jwt
const secret = require("../../config/keys");

//password
const passport = require("passport");

// $route  GET /api/user/test
// @desc   返回請求的JSON
// @access Public

router.get("/test", (req, res) => {
  res.json({ msg: "logged in!" });
});

// $route  POST /api/user/register
// @desc   返回請求的JSON
// @access Public
router.post("/register", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  //查詢數據庫是否有此email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json("此地址已經註冊過！");
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        identity: req.body.identity,
        password: req.body.password
      });

      const saltRounds = 10;
      bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        console.log("pwd hash :" + hash);
        if (err) {
          throw err;
        } else {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  });

  // $route  POST /api/user/edit
  // @desc   更新apikey
  // @access Private
  router.post(
    "/edit/:id",
    urlencodedParser,
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      //console.log("apikey:" + req.body.apikey);
      //console.log("apisecret:" + req.body.apisecret);
      console.log(`Request id: ${req.params.id}`);
      const apiObj = {};
      if (req.body.apikey) apiObj.apikey = req.body.apikey;
      if (req.body.apisecret) apiObj.apisecret = req.body.apisecret;
      User.updateOne(
        {
          _id: req.params.id,
          "apikeys.apikey": { $ne: req.body.apikey },
          "apikeys.apisecret": { $ne: req.body.apisecret }
        },
        {
          $push: {
            apikeys: {
              $each: [
                {
                  apikey: req.body.apikey,
                  apisecret: req.body.apisecret,
                  exchange: req.body.exchange
                }
              ]
            }
          }
        }
      ).then(
        // { apikey: 6, apisecret: 7 },
        // { apikey: 7, apisecret: 6 }
        // ,
        // $sort: { score: -1 },
        // $slice: 3
        user => {
          res.json(user);
        }
      );
    }
  );

  // $route  POST /api/user/login
  // @desc   返回token jwt / passport
  // @access Public
  router.post("/login", urlencodedParser, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    //query user in db
    User.findOne({ email }) // <==== if object name and parameter are same
      .then(user => {
        console.log(user);
        if (!user) return res.status(400).json("查無此E-Mail!");
        //return res.json({ msg: "user found!" });

        //compare password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) return res.status(404).json("密碼錯誤！");

          // jwt token come in to play
          //return res.json({ msg: "logging success!" });

          // jwt rule
          const rule = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            identity: user.identity
          };

          // jwt secert
          jwt.sign(rule, secret.key, { expiresIn: 3600 }, (err, token) => {
            if (err) console.log(err);
            res.json({
              sucess: true,
              token: "Bearer " + token
            });
          });
        });
      })
      .catch(err => console.log(err));
  });

  // $route  Get /api/user
  // @desc   返回current user
  // @access Private verify token (passport)

  router.get(
    "/",
    urlencodedParser,
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      User.find()
        .then(user => {
          if (!user) return res.status(404).json("没有任何内容");
          res.json(user);
        })
        .catch(err => res.status(404).json(err));
    }
  );

  // $route  Get /api/user/APIKEYs
  // @desc   返回current user
  // @access Private verify token (passport)

  router.get(
    "/APIKEYs/:id",
    urlencodedParser,
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log(`API Request id: ${req.params.id}`);

      User.findOne({ "apikeys.apikey": "abc123" }, function(err, the_user) {
        if (err) console.log(err);
        if (the_user) {
          console.log(the_user.apikeys[0].apikey); //goku
          // let count = the_user.apikeys.length;
          // console.log(`count is ${count}!`);
          res.json(the_user.apikeys);
        }
      });

      // User.aggregate(
      //   { $unwind: "$apikeys" },
      //   { $match: { "apikeys.apikey": "abc123" } },
      //   function(err, result) {
      //     console.log(result);
      //   }
      // );

      // User.find({ _id: req.params.id })
      //   .populate({
      //     path: "apikeys",
      //     //match: { age: { $gte: 18 } },
      //     select: "apikey apisecret exchange enabled"
      //   })
      //   .exec()
      //   .then(user => {
      //     console.log(`user got! : ` + user);
      //   });
    }
  );

  // $route  Get /api/user/current
  // @desc   返回current user
  // @access Private verify token (passport)

  router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      //res.json(req.user);
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
      });
    }
  );
});

module.exports = router;
