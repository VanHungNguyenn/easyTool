const Softwares = require('../models/softwareModel')

const softwareCtrl = {
	addSortware: async (req, res) => {
		try {
			const {
				id,
				softwareName,
				softwareDescription,
				softwareImage,
				note,
				tag,
			} = req.body

			if (!id || !softwareName) {
				return res
					.status(400)
					.json({ msg: 'Please fill in all fields' })
			}

			const newSoftware = new Users({
				id,
				softwareName,
				softwareDescription,
				softwareImage,
				note,
				tag,
			})

			await newSoftware.save().then(() => {
				return res
					.status(200)
					.json({ msg: 'User has been added successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateSoftware: async (req, res) => {
		try {
			const { id } = req.params
			const {
				softwareName,
				softwareDescription,
				softwareImage,
				note,
				tag,
			} = req.body

			await Softwares.findOneAndUpdate(
				{ id },
				{
					softwareName,
					softwareDescription,
					softwareImage,
					note,
					tag,
				}
			).then((software) => {
				if (!software) {
					return res.status(400).json({ msg: 'Software not found' })
				} else {
					return res.status(200).json({ msg: 'Updated successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteSoftware: async (req, res) => {
		try {
			const { id } = req.params
			await Softwares.findOneAndDelete({ id }).then((software) => {
				if (!software) {
					return res.status(400).json({ msg: 'Software not found' })
				} else {
					return res
						.status(200)
						.json({ msg: 'Delete software successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getSoftware: async (req, res) => {
		try {
			const { page, limit } = req.query

			const result = await Softwares.find()
				.sort({ createAt: 1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await Softwares.countDocuments()

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

module.exports = softwareCtrl
