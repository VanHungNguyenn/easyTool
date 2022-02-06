const CrawlerData = require('../models/crawlerDataModel')

const crawlerDataCtrl = {
	addCrawlerData: async (req, res) => {
		try {
			const {
				id,
				userId,
				propertyNames,
				createdDate,
				updatedDate,
				category,
				websiteUrl,
				property1,
				property2,
				property3,
				property4,
				property5,
				property6,
				property7,
				property8,
				property9,
				property10,
				property11,
				property12,
				property13,
				property14,
				property15,
				property16,
				property17,
				property18,
				property19,
				property20,
				note,
				tag,
			} = req.body

			if (!id || !userId || !propertyNames) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newCrawlerData = new CrawlerData({
				id,
				userId,
				propertyNames,
				createdDate,
				updatedDate,
				category,
				websiteUrl,
				property1,
				property2,
				property3,
				property4,
				property5,
				property6,
				property7,
				property8,
				property9,
				property10,
				property11,
				property12,
				property13,
				property14,
				property15,
				property16,
				property17,
				property18,
				property19,
				property20,
				note,
				tag,
			})

			await newCrawlerData.save().then(() => {
				res.status(200).json({ msg: 'Crawler data added successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateCrawlerData: async (req, res) => {
		try {
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteCrawlerData: async (req, res) => {
		try {
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getCrawlerData: async (req, res) => {
		try {
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
}

module.exports = crawlerDataCtrl
