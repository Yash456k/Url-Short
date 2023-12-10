const jwt = require('jsonwebtoken');
secret_key = '123456789'


function setUser(user) {
     const payload = {
        _id: user._id,
        email:user.email
     }
    return jwt.sign(payload,secret_key)
}

function getuser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,secret_key);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getuser
}