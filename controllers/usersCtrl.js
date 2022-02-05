const Users = require('../models/usersModel')

const usersCtrl = {
	addUser: async (req, res) => {
		try {
			const { id, deviceId, name, note, tag, balance } = req.body

			if (!id || !deviceId || !name) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newUser = new Users({
				id,
				deviceId,
				name,
				note,
				tag,
				balance,
			})

			await newUser.save().then(() => {
				return res
					.status(200)
					.json({ msg: 'User has been added successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateUser: async (req, res) => {
		try {
			const { id } = req.params

			const { deviceId, name, note, tag, balance } = req.body

			await Users.findOneAndUpdate(
				{ id },
				{
					deviceId,
					name,
					note,
					tag,
					balance,
				}
			).then((user) => {
				if (!user) {
					return res.status(400).json({ msg: 'User not found' })
				} else {
					return res.status(200).json({ msg: 'Updated successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteUser: async (req, res) => {
		try {
			const { id } = req.params

			await Users.findOneAndDelete({ id }).then((user) => {
				if (!user) {
					return res.status(400).json({ msg: 'User not found' })
				} else {
					return res
						.status(200)
						.json({ msg: 'Delete user successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getUser: async (req, res) => {
		try {
			const { page, limit } = req.query

			const result = await Users.find()
				.sort({ createAt: 1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await Users.countDocuments()

			res.status(200).json({
				total_db: count,
				total: result.length,
				result,
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	changeBalanceUser: async (req, res) => {
		try {
			const { id } = req.params

			const { balance } = req.body

			await Users.findOneAndUpdate(
				{ id },
				{
					balance,
				}
			).then((user) => {
				if (!user) {
					return res.status(400).json({ msg: 'User not found' })
				} else {
					return res
						.status(200)
						.json({ msg: 'Update balance successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
}

module.exports = usersCtrl
