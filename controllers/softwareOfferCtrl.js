const SoftwareOffer = require('../models/softwareOfferModel')

const softwareOfferCtrl = {
	addOffer: async (req, res) => {
		try {
			const { id, softwareId, offerName, price, offerDay, note, tag } =
				req.body

			if (!id || !softwareId || !offerName || !price) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newSoftwareOffer = new SoftwareOffer({
				id,
				softwareId,
				offerName,
				price,
				offerDay,
				note,
				tag,
			})

			await newSoftwareOffer.save().then(() => {
				return res
					.status(200)
					.json({ msg: 'Offer has been added successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateOffer: async (req, res) => {
		try {
			const { id } = req.params

			const { softwareId, offerName, price, offerDay, note, tag } =
				req.body

			await SoftwareOffer.findOneAndUpdate(
				{ id },
				{
					softwareId,
					offerName,
					price,
					offerDay,
					note,
					tag,
				}
			).then((offer) => {
				if (!offer) {
					return res.status(400).json({ msg: 'Offer not found' })
				} else {
					return res.status(200).json({ msg: 'Updated successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteOffer: async (req, res) => {
		try {
			const { id } = req.params

			await SoftwareOffer.findOneAndDelete({ id }).then((offer) => {
				if (!offer) {
					return res.status(400).json({ msg: 'Offer not found' })
				} else {
					return res
						.status(200)
						.json({ msg: 'Delete offer successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getOffer: async (req, res) => {
		try {
			const { page, limit } = req.query

			const result = await SoftwareOffer.find()
				.sort({ createAt: 1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await SoftwareOffer.countDocuments()

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

module.exports = softwareOfferCtrl
