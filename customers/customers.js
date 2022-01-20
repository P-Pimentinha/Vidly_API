const express = require('express');
const router = express.Router();
const Joi = require('joi');
const string = require('joi/lib/types/string');
const mongoose = require('mongoose');


const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: Boolean,
    name:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
    phoneNumber:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
}))

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
  });

  router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new Customer({ name: req.body.name });
    customer = await customer.save();
    
    res.send(customer);
  });


  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(customer, schema);
  }
  
  module.exports = router;