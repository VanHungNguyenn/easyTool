const router = require('express').Router()
const subscriptionCtrl = require('../controllers/subscriptionCtrl')

router.post('/add', subscriptionCtrl.addSubscription)
router.put('/update/:id_subscription', subscriptionCtrl.updateSubscription)
router.delete('/delete/:id_subscription', subscriptionCtrl.deleteSubscription)
router.get('/info', subscriptionCtrl.getSubscription)

module.exports = router
