const mongoose = require('mongoose'); // Erase if already required

var sensorSchema = new mongoose.Schema({
    measurementTimestamp: { 
        type: Date,
        default: Date.now 
    },
  PHValue: { 
    type: Number, 
    required: true 
},
  ORPValue: { 
    type: Number, 
    required: true 
},
  temperature: {
    type: Number, 
    required: true 
},
  location: { 
    type: String, 
    ref: 'Location', 
    default: "Yogyakarta",
},
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  // Add other measurement attributes as needed
}, {
  timestamps: true,
});

//Export the model
module.exports = mongoose.model('Sensor', sensorSchema);