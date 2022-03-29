const router = require('express').Router()
const userActivityCtrl = require('../controllers/userActivityCtrl')

router.post('/add', userActivityCtrl.addUserActivity)
router.put('/update/:userId', userActivityCtrl.updateUserActivity)
router.delete('/delete/:userId', userActivityCtrl.deleteUserActivity)
router.get('/info', userActivityCtrl.getUserActivity)

module.exports = router
