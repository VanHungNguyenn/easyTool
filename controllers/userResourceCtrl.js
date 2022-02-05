const UserResource = require('../models/userResourceModel')

const userResourceCtrl = {
	addUserResource: async (req, res) => {
		try {
			const { userId, resourceType, resourceUrl, note, tag } = req.body

			if (!userId || !resourceType || !resourceUrl) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newUserResource = new UserResource({
				userId,
				resourceType,
				resourceUrl,
				note,
				tag,
			})

			await newUserResource.save().then(() => {
				return res
					.status(200)
					.json({ msg: 'User Resource has been added successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateUserResource: async (req, res) => {
		try {
			const { userId } = req.params

			const { resourceType, resourceUrl, note, tag } = req.body

			await UserResource.findOneAndUpdate(
				{ userId },
				{
					resourceType,
					resourceUrl,
					note,
					tag,
				}
			).then((resource) => {
				if (!resource) {
					return res
						.status(400)
						.json({ msg: 'User resource not found' })
				} else {
					return res.status(200).json({ msg: 'Updated successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteUserResource: async (req, res) => {
		try {
			const { userId } = req.params

			await UserResource.findOneAndDelete({ userId }).then((resource) => {
				if (!resource) {
					return res
						.status(400)
						.json({ msg: 'User resource not found' })
				} else {
					return res
						.status(200)
						.json({ msg: 'Delete user resource successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getUserResource: async (req, res) => {
		try {
			const { page, limit } = req.query

			const result = await UserResource.find()
				.sort({ createAt: 1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await UserResource.countDocuments()

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

module.exports = userResourceCtrl
