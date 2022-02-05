const router = require('express').Router()
const usersCtrl = require('../controllers/usersCtrl')

router.post('/add', usersCtrl.addUser)
router.patch('/update/:id', usersCtrl.updateUser)
router.patch('/change_balance/:id', usersCtrl.changeBalanceUser)
router.delete('/delete/:id', usersCtrl.deleteUser)
router.get('/info', usersCtrl.getUser)

module.exports = router
