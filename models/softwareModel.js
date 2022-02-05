const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const softwaresSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			unique: true,
			required: true,
		},
		softwareName: {
			type: String,
			required: true,
		},
		softwareDescription: {
			type: String,
			default: null,
		},
		softwareImage: {
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
	{ timestamps: true }
)

softwaresSchema.plugin(AutoIncrement, { inc_field: 'id_software' })

module.exports = mongoose.model('Softwares', softwaresSchema)
