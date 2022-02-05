const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const crawlerDataSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	propertyNames: {
		type: String,
		required: true,
	},
	createdDate: {
		type: Date,
		default: null,
	},
	updatedDate: {
		type: Date,
		default: null,
	},
	category: {
		type: String,
		default: null,
	},
	websiteUrl: {
		type: String,
		default: null,
	},
	property1: {
		type: String,
		default: null,
	},
	property2: {
		type: String,
		default: null,
	},
	property3: {
		type: String,
		default: null,
	},
	property4: {
		type: String,
		default: null,
	},
	property5: {
		type: String,
		default: null,
	},
	property6: {
		type: String,
		default: null,
	},
	property7: {
		type: String,
		default: null,
	},
	property8: {
		type: String,
		default: null,
	},
	property9: {
		type: String,
		default: null,
	},
	property10: {
		type: String,
		default: null,
	},
	property11: {
		type: String,
		default: null,
	},
	property12: {
		type: String,
		default: null,
	},
	property13: {
		type: String,
		default: null,
	},
	property14: {
		type: String,
		default: null,
	},
	property15: {
		type: String,
		default: null,
	},
	property16: {
		type: String,
		default: null,
	},
	property17: {
		type: String,
		default: null,
	},
	property18: {
		type: String,
		default: null,
	},
	property19: {
		type: String,
		default: null,
	},
	property20: {
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
})

crawlerDataSchema.plugin(AutoIncrement, { inc_field: 'id_data' })

module.exports = mongoose.model('CrawlerData', crawlerDataSchema)
