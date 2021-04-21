const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegistration(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

    if (validator.isEmpty(data.firstName)) 
    {
        errors.firstName = 'First name required';
    }

    if (validator.isEmpty(data.lastName)) 
    {
        errors.lastName = 'Last name required';
    }

    if (validator.isEmpty(data.email)) 
    {
        errors.email = 'Email required';
    } 
    else if (!validator.isEmail(data.email)) 
    {
        errors.email = 'Invalid email';
    }

    if (validator.isEmpty(data.password)) 
    {
        errors.password = 'Password required';
    }

    if (validator.isEmpty(data.passwordConfirm)) 
    {
        errors.passwordConfirm = 'Confirmation password required';
    }

    if (!validator.isLength(data.password, { min: 8, max: 32 })) 
    {
        errors.password = 'Password length must be 8-32 charcters long';
    }

    if (!validator.equals(data.password, data.passwordConfirm))
    {
        errors.passwordConfirm = 'Passwords must match';
    }

    return { errors, isValid: isEmpty(errors) };
};