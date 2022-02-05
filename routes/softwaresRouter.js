const router = require('express').Router()
const softwareCtrl = require('../controllers/softwaresCtrl')

router.post('/add', softwareCtrl.addSortware)
router.patch('/update/:id', softwareCtrl.updateSoftware)
router.delete('/delete/:id', softwareCtrl.deleteSoftware)
router.get('/info', softwareCtrl.getSoftware)

module.exports = router
