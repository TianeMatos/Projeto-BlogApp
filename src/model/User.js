const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is Required"]
  },
  email: {
    type: String,
    trim: true,
    unique: [true, "Email already exists"],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: [true, "Email is Required"]
  },
  password: {
    type: String,
    required: [true, "Password is Required"]
  }

}, 
  { 
    timestamps: true
  }
);

userSchema.pre('save', async function(next) {
  try {
    // Check if the password has been modified
    if (!this.isModified('password')) return;

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

  } catch (error) {
    throw new Error('Password hashing failed');
  }
});

userSchema.methods.isValidPassword = async function(password) {
  try {
    // Compare provided password with stored hash
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Password comparison failed')
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;