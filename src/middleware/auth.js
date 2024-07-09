const { where, Model } = require('sequelize');
const db = require('../models');
const jwt = require('jsonwebtoken');
const responses = require('../responses/responses');
const Roles = require('../models/Roles');

const config = {
  tokenSecretKey: 'your_secret_key_here',
};

const tokenSecretKey = config.tokenSecretKey;

const checkRequest = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send(responses.invalidToken("No token provided"));
  }

  const parts = authorization.split(" ");
  if (parts.length!== 2) {
    return res.status(401).send(responses.invalidToken("Token Error"));
  }

  const [schema, token] = parts;
  if (!/^Bearer$/i.test(schema)) {
    return res.status(401).send(responses.invalidToken("Token malformatted"));
  }

  try {
    const decode = jwt.verify(token, tokenSecretKey, { ignoreExpiration: false });
    if (decode) {
      req.headers.tokenPayload = decode;
      return next();
    } else {
      return res.status(401).send(responses.invalidToken("Invalid token"));
    }
  } catch (error) {
    console.error(`Error verifying token: ${error.message}`);
    return res.status(401).send(responses.invalidToken("Invalid Token", error.code, error.message));
  }
};

const checkUser = (roles) => {
  return async (req, res, next) => {
    try {
      const { tokenPayload } = req.headers;
      if (tokenPayload && tokenPayload.userId) {
        const user = await db.user.findOne({ where: { id: tokenPayload.userId } });
        if (!user) {
          return res.status(401).send(responses.invalidToken("Invalid token"));
        }

        const userRoles = await db.userRole.findAll({
          where: { userId: tokenPayload.userId },
          include: [{
            model: Roles,
            as: 'role',
          }]
        });

        if (!roles || roles.length === 0 || userRoles.some(userRole => roles.includes(userRole.role.name))) {
          req.userRoles = userRoles;
          return next();
        } else {
          return res.status(403).send(responses.forbidden("Forbidden: Insufficient role", roles));
        }
      } else {
        return res.status(401).send(responses.invalidToken("Invalid token"));
      }
    } catch (error) {
      console.error(`Error checking user roles: ${error.message}`);
      return res.status(500).send(responses.serverError("Internal server error", {}, error.message, error.code));
    }
  };
};

module.exports = {
  checkUser
};