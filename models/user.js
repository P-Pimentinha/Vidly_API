const Joi = require('joi');
const mongoose = require('mongoose');

//Schema used to create the user object 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
  });
  
  const User = mongoose.model('User', userSchema);

  // Validation of the data sent by the client using joi
  function validateUser(user) {
    const schema = {
      email: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(50).required()
    };
  
    return Joi.validate(user, schema);
  }
  

  exports.User = User; 
 exports.validate = validateUser;
  