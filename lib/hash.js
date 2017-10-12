const bcrypt = require('bcrypt-nodejs');

/**
 * Compares the hashing with the values.
 * @param hash: data to be compared to.
 * @param val: data to compare.
 * @returns {boolean} - true if both are same
 */
exports.comparePassword = (hash,val) => {
    return bcrypt.compareSync(val, hash);
};

/**
 * encrypts the password.
 * @param password - password entered by the user
 * @returns {string} - returns the encrypted password
 */
exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};