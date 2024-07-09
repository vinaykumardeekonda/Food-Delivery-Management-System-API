// auth.controller.js
const { response } = require('express');
const db = require('../../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responses = require('../../responses/responses');

class AuthController {
  async register(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await db.Users.findOne({ where: { email: email } });
  
        if (existingUser) {
          return res.status(400).send('User already exists...');
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await db.Users.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
        });
  
        res.status(201).send('Registration successful...');
      } catch (error) {
        console.error('Error during registration', error);
        res.status(500).send('Internal server error');
      }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const userCheck = await db.Users.findOne({ where: { email: email } });

      if (!userCheck) {
        return res.status(400).send(responses.notFound('User not exists with this email...'));
      }

      const isMatch = await bcrypt.compare(password, userCheck.password);

      if (!isMatch) {
        return res.status(401).send(responses.invalidPassword('Invalid password'));
      }

      const tokenSecretKey = 'your_secret_key_here';
      const token = jwt.sign({ userId: userCheck.id }, tokenSecretKey, { expiresIn: '1h' });

      res.status(200).send(responses.success('User logged in...', { token }));
    } catch (error) {
      console.error('Error during login...', error);
      res.status(401).send(responses.internalServerError('Internal server error'));
    }
  }

  async details(req, res) {
    try {
        const { tokenPayload } = req;
  
        const findUser = await db.Users.findOne({
          where: {
            id: tokenPayload.userId,
          },
          attributes: ['firstName', 'lastName', 'email'], // Return only necessary information
        });
  
        if (findUser) {
          return res.status(200).send(responses.success('User found successfully', findUser));
        } else {
          return res.status(400).send(responses.notFound('User not found', {}));
        }
      } catch (error) {
        console.error('Error during fetching user details', error);
        res.status(500).send(responses.internalServerError('Internal Server Error', error));
      }
  }
}

module.exports = AuthController;