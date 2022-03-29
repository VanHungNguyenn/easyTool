const router = require('express').Router()
const usersCtrl = require('../controllers/usersCtrl')

router.post('/add', usersCtrl.addUser)
router.put('/update/:id', usersCtrl.updateUser)
router.put('/change_balance/:id', usersCtrl.changeBalanceUser)
router.delete('/delete/:id', usersCtrl.deleteUser)
router.get('/info', usersCtrl.getUser)

module.exports = router
