const router = require('express').Router()
const userRoleCtrl = require('../controllers/userRoleCtrl')

router.post('/add', userRoleCtrl.addUserRole)
router.patch('/update/:id', userRoleCtrl.updateUserRole)
router.delete('/delete/:id', userRoleCtrl.deleteUserRole)
router.get('/info', userRoleCtrl.getUserRole)

module.exports = router
