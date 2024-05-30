const asyncHandler = require("express-async-handler");
const validateMongoId = require('../utils/validateMongoId');
const Sensor = require("../models/sensorModel")

const getDeviceValues = () => {
    // Simulate fetching values from the device
    return {
        PHValue: Math.random() * (14.0 - 0.0) + 0.0, // Example PH range 0-14
        ORPValue: Math.random() * (400.0 - (-400.0)) + (-400.0), // Example ORP range -400 to 400 mV
        temperature: Math.random() * (40.0 - 0.0) + 0.0, // Example temperature range 0-40°C
    };
};

//Turning on the device
const deviceOn = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoId(id);

    try {
        // Fetch device values
        const deviceValues = getDeviceValues();

        // Create a new sensor document
        const newSensor = Sensor.create({
            PHValue: deviceValues.PHValue,
            ORPValue: deviceValues.ORPValue,
            temperature: deviceValues.temperature,
            location: "IDK", 
            user: id, 
        })
        // Respond with the saved sensor data
        res.json(newSensor);
    } catch (error) {
        console.error('Error turning on device and creating sensor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const getAllSensor = asyncHandler(async (req, res) =>{
    try {
        const sensor = await Sensor.find();
        res.json(sensor)
    } catch (error) {
        throw new Error(error)
    }
})

const getSensor = asyncHandler(async (req, res) => {
    const {id} = req.user
    validateMongoId(id);
    try {
        const sensor = await Sensor.find({ user: id });
        res.json(sensor)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { getAllSensor, deviceOn, getSensor}