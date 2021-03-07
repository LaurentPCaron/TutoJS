import { check } from 'express-validator';

import usersRepo from '../../repositories/users';

const requireTitle = check('title')
  .trim()
  .isLength({ min: 5, max: 40 })
  .withMessage('Must be between 4 and 40 characters');

const requirePrice = check('price')
  .trim()
  .toFloat()
  .isFloat({ min: 0.01 })
  .withMessage('Must be a number greater than 0.01');

const requireEmail = check('email')
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage('Must be a valid email')
  .custom(async email => {
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
      throw new Error('Email in use');
    }
  });

const requirePassword = check('password')
  .trim()
  .isLength({ min: 5, max: 20 })
  .withMessage('Must be between 4 and 20 characters');

const requirePasswordConfirmation = check('passwordConfirmation')
  .trim()
  .isLength({ min: 5, max: 20 })
  .withMessage('Must be between 4 and 20 characters')
  .custom((passwordConfirmation, { req }) => {
    if (passwordConfirmation !== req.body.password) {
      throw new Error('Password must match');
    } else {
      return true;
    }
  });

const requireValidEmail = check('email')
  .trim()
  .normalizeEmail()
  .normalizeEmail()
  .isEmail()
  .withMessage('Must provide a valide email')
  .custom(async email => {
    const user = await usersRepo.getOneBy({ email });
    if (!user) {
      throw new Error('Email not found!');
    }
  });

const requireValidPassword = check('password')
  .trim()
  .custom(async (password, { req }) => {
    const user = await usersRepo.getOneBy({ email: req.body.email });
    if (!user) {
      throw new Error('Invalide password!');
    }
    const validPassword = await usersRepo.comparePasswords(
      user.password,
      password
    );

    if (!validPassword) {
      throw new Error('Invalide password!');
    }
  });

export {
  requireTitle,
  requirePrice,
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireValidEmail,
  requireValidPassword,
};
