const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Verify Auth

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await userModel.findOne({ _id }).select("_id");

    Object.assign(req, { user });

    next();
  } catch (error) {
    console.log({ error });

    res.status(401).json({ error: "User not authenticated" });
  }
};

module.exports = requireAuth;
