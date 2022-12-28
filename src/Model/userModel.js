const mongoose = require('mongoose')

// ---=+=---------=+=----------=+=----------- [ User Model ] ---=+=---------=+=----------=+=----------- //

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
},
    { timestamps: true })

module.exports = mongoose.model('user', userSchema)

// --------------------------------- ****************** ---------------------------------- //