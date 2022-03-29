const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userActivitySchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
		},
		activityName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
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
	},
	{
		timestamps: true,
	}
)

userActivitySchema.plugin(AutoIncrement, { inc_field: 'id_user_activity' })

module.exports = mongoose.model('UserActivity', userActivitySchema)
