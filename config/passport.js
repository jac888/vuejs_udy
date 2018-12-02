//local Strategy to verify token
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const User = mongoose.model("users");
const secret = require("../config/keys");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret.key;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payLoad, done) => {
      //   console.log(jwt_payLoad.id);
      //   console.log(jwt_payLoad.name);
      //   console.log(jwt_payLoad.iat);
      //   console.log(jwt_payLoad.exp);
      User.findById(jwt_payLoad.id).then(user => {
        if (user) return done(null, user);
        else return done(null, false);
      });
    })
  );
};
