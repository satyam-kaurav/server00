const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "username and password is required" });
  }
  const duplicate = await User.findOne({ username: user }).exec(); // dont using callBack to handle error than use .exec();
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashPassword = await bcrypt.hash(pwd, 10);

    // creating and storing the new user
    const result = await User.create({
      username: user,
      password: hashPassword,
    });

    console.log(result);

    res.status(201).json({ success: `new user ${user} is created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
