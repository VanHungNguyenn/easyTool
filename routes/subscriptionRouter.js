const router = require('express').Router()
const subscriptionCtrl = require('../controllers/subscriptionCtrl')

router.post('/add', subscriptionCtrl.addSubscription)
router.patch('/update/:userId', subscriptionCtrl.updateSubscription)
router.delete('/delete/:userId', subscriptionCtrl.deleteSubscription)
router.get('/info', subscriptionCtrl.getSubscription)

module.exports = router
