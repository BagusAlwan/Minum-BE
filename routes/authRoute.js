const express = require('express');
const { createUser, loginUser, getAllUser, getUser, deleteUser, updateUser, handleRefreshToken, logout } = require('../controller/userControler');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/logins', loginUser);
router.post('/register', createUser);
router.get('/all-users', getAllUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);

router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/:id', authMiddleware, deleteUser);
router.put('/edit-user', authMiddleware, updateUser);


module.exports = router;
