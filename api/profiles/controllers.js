const Profile = require("../../models/Profile");

exports.profileCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    req.body.owner = req.user._id;
    const newProfile = await Profile.create(req.body);
    return res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};
exports.getProfile = async (req, res) => {
  try {
    const profile = await Product.find();
    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.profileDelete = async (req, res, next) => {
  try {
    await req.profile.remove();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const profile = await profile.findByIdAndUpdate(
      { _id: req.profile.id },
      req.body,
      { new: true, runValidators: true } // returns the updated trip
    );
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
