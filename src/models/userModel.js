const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        firstname: String,
        lastname: String
    },
    email: String,
    password: String,
    workouts: [
        {
            date: {
                type: Date,
                timeStart: Date.now(),
                timeEnd: Date.now(),
                workout: [
                    {
                        exercisename: String,
                        repetitions: Number,
                        weight: Number
                    }
                ]
            }
        }
    ]
});


// Export the model
module.exports = mongoose.model('User', UserSchema);