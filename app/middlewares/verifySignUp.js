const db = require('../models');
const User = db.user;

const checkDuplicateEmail = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
  
      if (user) {
        return res.status(400).send({ message: "Failed! Email is already in use!" });
      }
  
      next();
    } catch (err) {
      res.status(500).send({ message: err.message || "Some error occurred while checking email." });
    }
  };

const verifySignUp = {
    checkDuplicateEmail
}

module.exports = verifySignUp;