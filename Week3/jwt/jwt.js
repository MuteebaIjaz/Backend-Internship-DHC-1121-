const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'secret_jwt_key_12345';

const GenerateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2d"
        }
    );
};

module.exports =  GenerateToken ;