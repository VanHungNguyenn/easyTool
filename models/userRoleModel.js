const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userRoleSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		roleId: {
			type: String,
			required: true,
		},
		roleName: {
			type: String,
			default: 'trial', // 'trial', 'basic', 'pro'
		},
		note: {
			type: String,
			default: null,
		},
		tag: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
)

userRoleSchema.plugin(AutoIncrement, { inc_field: 'id_role' })

module.exports = mongoose.model('UserRole', userRoleSchema)
