/********************** IMPORTS **********************/
const User = require('../../models/user-model');
const Contact = require('../../models/contact-model');
const validateRegistration = require('../../validation/register');
/********************** MAIN **********************/
// defines the CRUD operations
// C - Create
// R - Read 
// U - Update
// D - Delete

// creates a user
create = (req, res) => {
    const body = req.body;
    const { errors, valid } = validateRegistration(body);

    if (!valid) 
    {
        return res.status(400).json(errors);
    }

    if (!body) 
    {
        return res.status(400).json({
            success: false,
            error: 'Failed to create account'
        });
    }

    User.findOne({ email: body.email }, function(err, user) {
        if (user)
        {
            return res.status(400).json({ email: "Email already exists" });
        }
    });
    
    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password
    });

    if (!user) 
    {
        return res.status(400).json({
            success: false,
            error: err
        });
    }

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'Account successfully created'
            });
        });
}

// update user
update = async (req, res) => {
    const body = req.body;

    if (!body) 
    {
        return res.status(400).json({
            success: false,
            error: 'Unable to update user profile'
        });
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) 
        {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.firstName = body.firstName ? body.firstName : user.firstName;
        user.lastName = body.lastName ? body.lastName : user.lastName;
        user.email = body.email ? body.email : user.email;
        user.password = body.password ? body.password : user.password;

        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated succefully'
                });
            })
            .catch( e => {
                return res.status(400).json({
                    e, message: 'Unable to update user profile'
                });
            });
    });
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) 
        {
            return res.status(400).json({
                success: false,
                error: err
            });
        }

        if (!user) 
        {
            return res.status(404).json({
                success: false, 
                error: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    }).catch(err => console.log(err));
}

getUserByID = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) 
        {
            return res.status(400).json({
                success: false,
                error: err
            });
        }

        if (!user) 
        {
            return res.status(404).json({
                success: false, 
                error: 'User not found'
            });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) 
        {
            return res.status(400).json({
                success: false,
                error: err
            });
        }

        if (!users.length) 
        {
            return res.status(404).json({
                success: false, 
                error: 'No users found'
            });
        }

        return res.status(200).json({ success: true, data: users });
    }).catch(err => console.log(err));
}


addContact = async (req, res) => {
    const body = req.body;

    if (!body) 
    {
        return res.status(400).json({
            success: false,
            error: 'Failed to add contact'
        });
    }

    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) 
        {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        User.findOne({ email: body.email }, (error, contact) => {
            if (error) 
            {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            
            const newContact = new Contact({
                _id: contact._id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email
            });

            user.contacts.push(newContact);
            console.log(newContact);
            console.log(user.contacts);
        })

        user.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'Contact successfully added'
                });
            })
            .catch( e => {
                return res.status(400).json({
                    e, message: 'Unable to add contact'
                });
            });
    });
}


module.exports = {
    create,
    update,
    deleteUser,
    getUserByID,
    getUsers,
    addContact
};