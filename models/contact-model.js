/********************** IMPORTS **********************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

/********************** MAIN **********************/

// defines the user-model schmea 
const ContactSchema = new Schema(
    {
        firstName: { type: String, trim: true, required: 'First name required' },
        lastName: { type: String, trim: true, required: 'Last name required' },
        email: { 
                    type: String, trim: true, 
                    unique: 'Email address already exists', 
                    match: [/.+\@.+\..+/, 'Please enter a valid email'], 
                    required: 'Email is required'
                },
        //dateOfBrith: { type: Date, required: 'Date of Birth required' },
        //phone: { type: String, required: 'Phone number required' },
    }, { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
