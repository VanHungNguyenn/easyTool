const Users = require('../models/usersModel')

const usersCtrl = {
	// @route POST user/add
	// @desc Add new user
	// @access Private
	addUser: async (req, res) => {
		try {
			const { deviceId, name, note, tag, balance } = req.body

			if (!deviceId || !name) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newUser = new Users({
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
	// @route PATCH user/update/:id
	// @desc Update user
	// @access Private
	updateUser: async (req, res) => {
		try {
			const { id } = req.params

			const { deviceId, name, note, tag, balance } = req.body

			await Users.findOneAndUpdate(
				{ id_user: id },
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
					return res
						.status(200)
						.json({ msg: 'Updated user successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	// @route DELETE user/delete/:id
	// @desc Delete user
	// @access Private
	deleteUser: async (req, res) => {
		try {
			const { id } = req.params

			await Users.findOneAndDelete({ id_user: id }).then((user) => {
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
	// @route GET user/info
	// @desc Get user info
	// @access Private
	getUser: async (req, res) => {
		try {
			const { page, limit, idStart, idEnd } = req.query

			const conditions = {}

			if (idStart || idEnd) {
				conditions['id_user'] = {}

				if (idStart) {
					conditions['id_user']['$gte'] = idStart
				}

				if (idEnd) {
					conditions['id_user']['$lte'] = idEnd
				}
			}

			const result = await Users.find(conditions)
				.sort({ createdAt: -1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await Users.countDocuments(conditions)

			res.status(200).json({
				total_db: count,
				total: result.length,
				result,
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	// @route PATCH user/change_balance/:id
	// @desc Change balance user
	// @access Private
	changeBalanceUser: async (req, res) => {
		try {
			const { id } = req.params

			const { balance } = req.body

			await Users.findOneAndUpdate(
				{ id_user: id },
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
	// @route GET user/detail/:deviceId
	// @desc Get user detail
	// @access Private
	getUserDetail: async (req, res) => {
		try {
			const { deviceId } = req.params

			const result = await Users.findOne({ deviceId })

			if (!result) {
				return res.status(400).json({ msg: 'User not found' })
			} else {
				return res.status(200).json({ result })
			}
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
}

module.exports = usersCtrl
