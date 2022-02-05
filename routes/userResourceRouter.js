const router = require('express').Router()
const userResourceCtrl = require('../controllers/userResourceCtrl')

router.post('/add', userResourceCtrl.addUserResource)
router.patch('/update/:userId', userResourceCtrl.updateUserResource)
router.delete('/delete/:userId', userResourceCtrl.deleteUserResource)
router.get('/info', userResourceCtrl.getUserResource)

module.exports = router
