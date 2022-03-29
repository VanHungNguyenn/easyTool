const CrawlerData = require('../models/crawlerDataModel')

const crawlerDataCtrl = {
	addCrawlerData: async (req, res) => {
		try {
			const {
				userId,
				propertyNames,
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

			if (!userId || !propertyNames) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newCrawlerData = new CrawlerData({
				userId,
				propertyNames,
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
				res.status(200).json({ msg: 'Data added successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateCrawlerData: async (req, res) => {
		try {
			const { id } = req.params

			const {
				userId,
				propertyNames,
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

			await CrawlerData.findOneAndUpdate(
				{ id_data: id },
				{
					userId,
					propertyNames,
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
				}
			).then((data) => {
				if (!data) {
					return res.status(404).json({ msg: 'Data not found' })
				}

				res.status(200).json({ msg: 'Data updated successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteCrawlerData: async (req, res) => {
		try {
			const { id } = req.params

			await CrawlerData.findOneAndDelete({ id_data: id }).then((data) => {
				if (!data) {
					return res.status(404).json({ msg: 'Data not found' })
				}

				res.status(200).json({ msg: 'Data deleted successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getCrawlerData: async (req, res) => {
		try {
			const {
				page,
				limit,
				idStart,
				idEnd,
				category,
				userId,
				websiteurl,
				timeStart,
				timeEnd,
			} = req.query

			const conditions = {}

			if (idStart || idEnd) {
				conditions['id_data'] = {}

				if (idStart) {
					conditions['id_data']['$gte'] = idStart
				}

				if (idEnd) {
					conditions['id_data']['$lte'] = idEnd
				}
			}

			if (category) {
				conditions['category'] = category
			}

			if (userId) {
				conditions['userId'] = userId
			}

			if (websiteurl) {
				conditions['websiteUrl'] = websiteurl
			}

			if (timeStart || timeEnd) {
				conditions['createdAt'] = {}

				if (timeStart) {
					conditions['createdAt']['$gte'] = timeStart
				}

				if (timeEnd) {
					conditions['createdAt']['$lte'] = timeEnd
				}
			}

			const result = await CrawlerData.find(conditions)
				.sort({ createdAt: -1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await CrawlerData.countDocuments(conditions)

			res.status(200).json({
				total_db: count,
				total: result.length,
				result,
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
}

module.exports = crawlerDataCtrl
