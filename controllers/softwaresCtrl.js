const Softwares = require('../models/softwareModel')

const softwareCtrl = {
	addSoftware: async (req, res) => {
		try {
			const {
				softwareName,
				softwareDescription,
				softwareImage,
				note,
				tag,
			} = req.body

			if (!softwareName) {
				return res
					.status(400)
					.json({ msg: 'Please fill in all fields' })
			}

			const newSoftware = new Softwares({
				softwareName,
				softwareDescription,
				softwareImage,
				note,
				tag,
			})

			await newSoftware.save().then(() => {
				return res
					.status(200)
					.json({ msg: 'Software has been added successfully' })
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
				{ id_software: id },
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
			await Softwares.findOneAndDelete({ id_software: id }).then(
				(software) => {
					if (!software) {
						return res
							.status(400)
							.json({ msg: 'Software not found' })
					} else {
						return res
							.status(200)
							.json({ msg: 'Delete software successfully' })
					}
				}
			)
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getSoftware: async (req, res) => {
		try {
			const { page, limit, idStart, idEnd } = req.query

			const conditions = {}

			if (idStart || idEnd) {
				conditions['id_software'] = {}

				if (idStart) {
					conditions['id_software']['$gte'] = idStart
				}

				if (idEnd) {
					conditions['id_software']['$lte'] = idEnd
				}
			}

			const result = await Softwares.find(conditions)
				.sort({ createdAt: -1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await Softwares.countDocuments(conditions)

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
