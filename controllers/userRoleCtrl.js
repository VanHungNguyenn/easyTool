const UserRole = require('../models/userRoleModel')

const userRoleCtrl = {
	addUserRole: async (req, res) => {
		try {
			const { userId, roleId, roleName, note, tag } = req.body

			if (!userId || !roleId) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newUserRole = new UserRole({
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
				{ id_role: id },
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

			await UserRole.findOneAndDelete({ id_role: id }).then((user) => {
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
			const { page, limit, idStart, idEnd } = req.query

			const conditions = {}

			if (idStart || idEnd) {
				conditions['id_role'] = {}

				if (idStart) {
					conditions['id_role']['$gte'] = idStart
				}

				if (idEnd) {
					conditions['id_role']['$lte'] = idEnd
				}
			}

			const result = await UserRole.find(conditions)
				.sort({ createdAt: -1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await UserRole.countDocuments(conditions)

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
