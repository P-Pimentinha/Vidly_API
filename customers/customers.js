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