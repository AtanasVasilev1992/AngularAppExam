const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (userData) => {
  if (userData.password !== rePassword) {
    throw new Error("Password missmatch!");
  }

  const { email,
    username,
    country,
    city,
    password,
   } = userData

  const user = await User.create( email,
    username,
    country,
    city,
    password,
    );

  return genereteToken(user);
};

exports.login = async (userData) => {
  const user = await User.findOne({ email: User.email });

  if (!user) {
    throw new Error("Incorrect email or password!");
  }

  const isValid = await bcrypt.compare(userData.password, user.password);
  if (!isValid) {
    throw new Error("Incorrect email or password!");
  }

  return genereteToken(user);
};

exports.getAll = () => User.find()



function genereteToken(user) {
  //! TODO must be convert...
  const accesToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    "TheSecret123"
  );

  return {
    userId: user._id,
    email: user.email,
    accesToken,
  };
}
