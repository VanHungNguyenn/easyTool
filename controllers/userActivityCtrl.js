const UserActivity = require('../models/userActivityModel')

const userActivityCtrl = {
	addUserActivity: async (req, res) => {
		try {
			const { userId, activityName, description, note, tag } = req.body

			if (!userId || !activityName) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newUserActivity = new UserActivity({
				userId,
				activityName,
				description,
				note,
				tag,
			})

			await newUserActivity.save().then(() => {
				return res
					.status(200)
					.json({ msg: 'User activity has been added successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateUserActivity: async (req, res) => {
		try {
			const { userId } = req.params

			const { activityName, description, note, tag } = req.body

			await UserActivity.findByIdAndUpdate(
				{ userId },
				{
					activityName,
					description,
					note,
					tag,
				}
			).then((activity) => {
				if (!activity) {
					return res
						.status(400)
						.json({ msg: 'User activity not found' })
				} else {
					return res.status(200).json({ msg: 'Updated successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteUserActivity: async (req, res) => {
		try {
			const { userId } = req.params

			await UserActivity.findOneAndDelete({ userId }).then((activity) => {
				if (!activity) {
					return res
						.status(400)
						.json({ msg: 'User activity not found' })
				} else {
					return res
						.status(200)
						.json({ msg: 'Delete user activity successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getUserActivity: async (req, res) => {
		try {
			const { page, limit, idStart, idEnd } = req.query

			const conditions = {}

			if (idStart || idEnd) {
				conditions['id_user_activity'] = {}

				if (idStart) {
					conditions['id_user_activity']['$gte'] = idStart
				}

				if (idEnd) {
					conditions['id_user_activity']['$lte'] = idEnd
				}
			}

			const result = await UserActivity.find(conditions)
				.sort({ createdAt: 1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await UserActivity.countDocuments(conditions)

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

module.exports = userActivityCtrl
