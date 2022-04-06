const mongoose = require('mongoose')
const AutoIcrement = require('mongoose-sequence')(mongoose)

const softwareOfferSchema = new mongoose.Schema(
	{
		softwareId: {
			type: String,
			required: true,
		},
		offerName: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		offerDay: {
			type: Date,
			default: null,
		},
		note: {
			type: String,
			default: null,
		},
		tag: {
			type: String,
			default: null,
		},
		maximumProduct: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
)

softwareOfferSchema.plugin(AutoIcrement, { inc_field: 'id_offer' })

module.exports = mongoose.model('SoftwareOffer', softwareOfferSchema)
