const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const UserDetail = db.user_detail;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    try {
        // Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8) // Ensure bcrypt hashing is correct
        });

        // Save the user to the database
        const savedUser = await user.save();

        // Create user details with the newly created user's ID
        const userDetail = new UserDetail({
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            user_id: savedUser._id // Associate the user detail with the created user
        });

        // Save the user details to the database
        const savedUserDetail = await userDetail.save();

         // Update the user document to reference the user detail
         savedUser.userDetail = savedUserDetail._id;
         await savedUser.save();

        // Optionally, you can return the user and user details in the response
        res.send({
            message: "User registered successfully!",
            user: savedUser,
            userDetail: savedUserDetail
        });

    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred during registration." });
    }
}; 

exports.me = async(req,res)=>{
    try {
        const user = await User.findById(req.userId).exec();
        console.log(user)
           if(!user){
            return res.status(500).send({ message:  "User Not found." });
           }
          
           const userDetail = await UserDetail.findOne({
            user_id: user?._id
           }).exec()

    
                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    userDetail: userDetail,
                  
                  });
    } catch (error) {
        res.status(500).send({ message: err.message || "Some error occurred" });
    }
}


exports.login = async (req,res)=>{
    try {
        console.log(req.userId)
     const user = await  User.findOne({
        email: req.body.email
       }).exec()

       if(!user){
        return res.status(500).send({ message:  "The login details are incorrect." });
       }
      
       const userDetail = await UserDetail.findOne({
        user_id: user?._id
       }).exec()
       var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
       )

       if(!passwordIsValid){
        return res.status(500).send({ message:  "The login details are incorrect." });
       }

       const token = jwt.sign({id:user.id},
                                     config.secret,
                                     {
                                        algorithm:'HS256',
                                        allowInsecureKeySizes:true,
                                        expiresIn:86400 //24hr
                                     });

            req.session.token = token;

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                userDetail: userDetail,
                authToken: token
              });
              

    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred during registration." });
    }
}
