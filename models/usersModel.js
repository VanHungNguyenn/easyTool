const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const usersSchema = new mongoose.Schema(
	{
		deviceId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
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
		balance: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
)

usersSchema.plugin(AutoIncrement, { inc_field: 'id_user' })

module.exports = mongoose.model('Users', usersSchema)
