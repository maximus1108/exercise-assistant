require('./User');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');
const User = new userModel();

test('Setting user password should resolve promise', () => {
    expect.assertions(1);
    return User.setPassword('mypassword').then(data => {
      expect(data).toBe(true);
    });
})