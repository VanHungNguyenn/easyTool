const router = require('express').Router()
const crawlerDataCtrl = require('../controllers/crawlerDataCtrl')

router.post('/add', crawlerDataCtrl.addCrawlerData)
router.put('/update/:id', crawlerDataCtrl.updateCrawlerData)
router.delete('/delete/:id', crawlerDataCtrl.deleteCrawlerData)
router.get('/info', crawlerDataCtrl.getCrawlerData)

module.exports = router
