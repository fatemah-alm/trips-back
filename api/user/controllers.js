const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config./keys");
const Profile = require("../../models/Profile");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const newProfile = await Profile.create({
      owner: newUser._id,
      // bio: "",
      // image: "",
    });
    const updatedUser = await User.findByIdAndUpdate(newUser._id, {
      profile: newProfile._id,
    });
    const payload = {
      id: updatedUser._id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      profile: newProfile._id,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    console.log("!!!!!", payload);
    console.log("+++++++", updatedUser.profile);
    console.log("--------", newProfile._id);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const user = req.user;
  console.log("user", user);
  const profile = await Profile.findById(user.profile);
  const payload = {
    id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    profile: profile._id,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.status(201).json({ token });
};

// exports.profileCreate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `/${req.file.path}`;
//       req.body.image = req.body.image.replace("\\", "/");
//     }
//     req.body.owner = req.user._id;
//     const newProfile = await Profile.create(req.body);
//     return res.status(201).json(newProfile);
//   } catch (error) {
//     next(error);
//   }
// };
