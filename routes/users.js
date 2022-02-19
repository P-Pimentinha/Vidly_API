const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user')
const mongoose = require('mongoose');

router.post('/', async (req, res) => {

    // Validation of the data in (req.body) using the imported function validate 
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    //Looks for accounts registered with the same email  
    let user = await User.findOne({email: req.body.email});
      if (user) return res.status(400).send('Email already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    //bcrypt is used to hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    
    const token = user.generateAuthToken();
    //.pick returns an object that contains only the properties passed to it from another object. 
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  });

  module.exports = router;