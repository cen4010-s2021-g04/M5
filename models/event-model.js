/********************** IMPORTS **********************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

/********************** MAIN **********************/

// defines the user-model schmea 
const EventSchema = new Schema(
    {
        subject: { type: String, trim: true, required: 'Subject title required' },
        location: {type: String },
        startTime: { type: Date },
        endTime: { type: Date },
        timeZone: { type: String },
        isAllDay: { type: Boolean, default: false },
        repeat: { type: String, 
                enum: ['Never', 'Daily', 'Weekly', 'Monthly', 'Yearly'], 
                default: 'Never' },
    }, { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
