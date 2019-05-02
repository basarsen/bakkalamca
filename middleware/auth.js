const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
   const token = req.header('x-auth-token');
   if (!token)
      return res.status(401).send('Access denied. No token provided.');

   try {
      const decoded = jwt.verify(token, 'somePrivateKey');
      req.customer = decoded;
      next();
   } catch (err) {
      res.status(400).send('Invalid token!');
   }
}