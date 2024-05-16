const mongoose = require('mongoose'); // Erase if already required
const bycrpt = require('bcrypt')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type:String,
        default:"user",
    },
    isBlocked: {
        type:Boolean,
        default: false,
    },
    address: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    refreshToken: {
        type: String
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    const salt = await bycrpt.genSaltSync(10);
    this.password = await bycrpt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function  (enterPassword) {
    return await bycrpt.compare(enterPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);