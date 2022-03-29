const router = require('express').Router()
const softwareOfferCtrl = require('../controllers/softwareOfferCtrl')

router.post('/add', softwareOfferCtrl.addOffer)
router.put('/update/:id', softwareOfferCtrl.updateOffer)
router.delete('/delete/:id', softwareOfferCtrl.deleteOffer)
router.get('/info', softwareOfferCtrl.getOffer)

module.exports = router
