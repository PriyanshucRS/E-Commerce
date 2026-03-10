const authService = require('../service/auth.service'); 

exports.register = async (req, res) => {
    try {
        // Sirf service ko data pass karein
        const result = await authService.registerUser(req.body);
        
        // Success response
        res.status(201).json({ message: "User registered", user: result });
    } catch (err) {
        // Error handling (400 Bad Request)
        res.status(400).send(err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        
        // Token aur user data response mein bhejein
        res.status(200).json(result);
    } catch (err) {
        // Error handling (401 Unauthorized)
        res.status(401).send(err.message);
    }
};
