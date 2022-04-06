const Subscription = require('../models/subscriptionModel')

const subscriptionCtrl = {
	addSubscription: async (req, res) => {
		try {
			const {
				userId,
				softwareId,
				subcribedAt,
				expiredDate,
				note,
				tag,
				offerId,
				remainingProduct,
				type,
			} = req.body

			if (!userId || !softwareId || !subcribedAt || !expiredDate) {
				return res.status(400).json({ msg: 'Please fill in all field' })
			}

			const newSubscription = new Subscription({
				userId,
				softwareId,
				subcribedAt,
				expiredDate,
				note,
				tag,
				offerId,
				remainingProduct,
				type,
			})

			await newSubscription.save().then(() => {
				return res
					.status(200)
					.json({ msg: 'Subscription has been added successfully' })
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateSubscription: async (req, res) => {
		try {
			const { id_subscription } = req.params

			const {
				softwareId,
				userId,
				subcribedAt,
				expiredDate,
				note,
				tag,
				offerId,
				remainingProduct,
				type,
			} = req.body

			await Subscription.findOneAndUpdate(
				{ id_subscription },
				{
					softwareId,
					userId,
					subcribedAt,
					expiredDate,
					note,
					tag,
					offerId,
					remainingProduct,
					type,	
				}
			).then((sub) => {
				if (!sub) {
					return res
						.status(400)
						.json({ msg: 'Subscription not found' })
				} else {
					return res.status(200).json({ msg: 'Updated successfully' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteSubscription: async (req, res) => {
		try {
			const { id_subscription } = req.params

			await Subscription.findOneAndDelete({ id_subscription }).then(
				(sub) => {
					if (!sub) {
						return res
							.status(400)
							.json({ msg: 'Subscription not found' })
					} else {
						return res
							.status(200)
							.json({ msg: 'Delete subscription successfully' })
					}
				}
			)
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getSubscription: async (req, res) => {
		try {
			const { page, limit, idStart, idEnd } = req.query

			const conditions = {}

			if (idStart || idEnd) {
				conditions['id_subscription'] = {}

				if (idStart) {
					conditions['id_subscription']['$gte'] = idStart
				}

				if (idEnd) {
					conditions['id_subscription']['$lte'] = idEnd
				}
			}

			const result = await Subscription.find(conditions)
				.sort({ createdAt: -1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const count = await Subscription.countDocuments(conditions)

			res.status(200).json({
				total_db: count,
				total: result.length,
				result,
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getSubscriptionDetail: async (req, res) => {
		// get all subscriptions userId = x
		try {
			const { userId } = req.params

			const result = await Subscription.find({ userId }).then((sub) => {
				if (!sub) {
					return res
						.status(400)
						.json({ msg: 'Subscription not found' })
				} else {
					return res.status(200).json({
						msg: 'Get subscription successfully',
						total: sub.length,
						result: sub,
					})
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
}

module.exports = subscriptionCtrl
