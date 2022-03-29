const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Connect to mongoose
const URI = process.env.MONGODB_URL
mongoose.connect(URI, (err) => {
	if (err) throw err
	console.log('Connected to mongodb')
})

// Routes
app.use('/user', require('./routes/usersRouter'))
app.use('/user_role', require('./routes/userRoleRouter'))
app.use('/software', require('./routes/softwaresRouter'))
app.use('/software_offer', require('./routes/softwareOfferRouter'))
app.use('/subscription', require('./routes/subscriptionRouter'))
app.use('/user_activity', require('./routes/userActivityRouter'))
app.use('/user_resource', require('./routes/userResourceRouter'))
app.use('/data', require('./routes/crawlerDataRouter'))
app.use((req, res) => {
	res.status(404).json({ msg: '404 Not Found' })
})

const PORT = process.env.PORT || 5014

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
