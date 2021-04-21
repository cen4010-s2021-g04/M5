/********************** IMPORTS **********************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

/********************** MAIN **********************/

// defines the user-model schmea 
const CalendarSchema = new Schema(
    {
        subject: { type: String, trim: true, required: 'Calender name required' },
        events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    }, { timestamps: true }
);

module.exports = mongoose.model('Calendar', CalendarSchema);
