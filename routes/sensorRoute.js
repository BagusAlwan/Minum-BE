const express = require('express');
const { getAllSensor, deviceOn, getSensor } = require('../controller/sensorController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/turn-on', authMiddleware, deviceOn)
router.get('/', authMiddleware, getAllSensor)
router.get('/me', authMiddleware, getSensor)

module.exports = router;