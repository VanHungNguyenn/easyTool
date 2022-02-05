const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userResourceSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	resourceType: {
		type: String,
		required: true,
	},
	resourceUrl: {
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
})

userResourceSchema.plugin(AutoIncrement, { inc_field: 'id_user_resource' })

module.exports = mongoose.model('UserResource', userResourceSchema)
