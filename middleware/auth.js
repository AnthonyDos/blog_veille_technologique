const jwt = require('jsonwebtoken');
const { errorNotAuthorized } = require('../config/errorMessage/errorMessage');
require('dotenv').config();

 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error: errorNotAuthorized });
   }
};