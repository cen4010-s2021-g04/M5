/********************** IMPORTS **********************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

/********************** MAIN **********************/
const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_TIME = 2 * 60 * 606 * 1000; // 2 hours

// defines the user-model schmea 
const UserSchema = new Schema(
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
        password: { 
                    type: String,
                    //minLength: [8, 'Password should be at least 8 chracters'],
                    required: 'Password required'
                  },
        contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
        calenders: [{ type: Schema.Types.ObjectId, ref: 'Calendar' }],
        //salt: String,
        // create: { type: Date, default: Date.now },
        // updated: Date,   // updated: { type: Date, default: Date.now }
        loginAttempts: { type: Number, required: true, default: 0 },
        untilLock: { type: Number }
    }, { timestamps: true }
);

// password hashing middleware
UserSchema.pre('save', function(next) {
    var user = this;

    // only hashs the password if it is updated or new
    if (!user.isModified('password')) return next();

    // genereates salt to hash password text
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next();

        // hashes the password with the generated salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) next(hash);

            // override the plainText with the hashed text
            user.password = hash;
            next();
        });
    });
});

// password verification
UserSchema.methods.comparePassword = function(canPassword, cb) {
    bcrypt.compare(canPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// failed login enum
UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};

module.exports = mongoose.model('User', UserSchema);