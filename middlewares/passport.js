const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config./keys");

const User = require("../models/User");

const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const isPasswordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (isPasswordMatch) return done(null, user);

    const error = {
      message: "unauthorize",
      status: 401,
    };
    done(error);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) return done(null, user);
      return null, false;
    } catch (error) {
      done(error);
    }
  }
);
