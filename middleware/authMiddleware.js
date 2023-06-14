// const jwt = require('jsonwebtoken');

// function authenticate(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Authentication failed' });
//   }

//   // Verify and decode the token
//   jwt.verify(token, 'secretKey', (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     req.user = decodedToken;
//     next();
//   });
// }

// module.exports = {
//   authenticate
// };
