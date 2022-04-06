const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const subscriptionSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		softwareId: {
			type: String,
			required: true,
		},
		subcribedAt: {
			type: Date,
			required: true,
		},
		expiredDate: {
			type: Date,
			required: true,
		},
		note: {
			type: String,
			default: null,
		},
		tag: {
			type: String,
			default: null,
		},
		offerId: {
			type: String,
			default: null,
		},
		remainingProduct: {
			type: Number,
			default: 0,
		},
		type: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
)

subscriptionSchema.plugin(AutoIncrement, { inc_field: 'id_subscription' })

module.exports = mongoose.model('Subscription', subscriptionSchema)
