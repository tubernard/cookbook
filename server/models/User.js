import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
