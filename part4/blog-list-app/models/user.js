const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // THE PASSWORDHASH SHOULD NOT BE REVEALED
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model('User', userSchema);
