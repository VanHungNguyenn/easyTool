const UserRole = require('../models/userRoleModel')

const userRoleCtrl = {
	addUserRole: async (req, res) => {
		try {
			const { id, userId, roleId, roleName, note, tag } = req.body

			if (!id || !userId || !roleId) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newUserRole = new UserRole({
				id,
				userId,
				roleId,
				roleName,
				note,
				tag,
			})

			await newUserRole.save().then(() => {
				return res
					.status(200)
					.json({ msg: 'User role has been added successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateUserRole: async (req, res) => {
		try {
			const { id } = req.params
			const { userId, roleId, roleName, note, tag } = req.body

			await UserRole.findOneAndUpdate(
				{ id },
				{
					userId,
					roleId,
					roleName,
					note,
					tag,
				}
			).then((user) => {
				if (!user) {
					return res.status(400).json({ msg: 'User not found' })
				} else {
					return res
						.status(200)
						.json({ msg: 'Updated user role successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteUserRole: async (req, res) => {
		try {
			const { id } = req.params

			await UserRole.findOneAndDelete({ id }).then((user) => {
				if (!user) {
					return res.status(400).json({ msg: 'User not found' })
				} else {
					return res
						.status(200)
						.json({ msg: 'Delete user role successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getUserRole: async (req, res) => {
		try {
			const { page, limit } = req.query

			const result = await UserRole.find()
				.sort({ createAt: 1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await UserRole.countDocuments()

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

module.exports = userRoleCtrl
