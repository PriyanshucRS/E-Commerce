const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).send("Passwords do not match");
        }

        const user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(201).send({ message: "User registered" });
    } catch (err) {
        res.status(400).send(err.message)
    }

}

exports.login = async(req, res) =>{
   const user = await User.findOne({ email: req.body.email });
    if(!user || !(await bcrypt.compare(req.body.password, user.password))){
        return res.status(401).send("Invalid credentials");
    }
   const token = jwt.sign({id : user._id}, process.env.JWT_SECRET,{ expiresIn : '1d'})
    res.send({ token });

}