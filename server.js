if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index.js')
//  for the view engine 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// for the layout for but the footer and header
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// for the images
app.use(express.static('public'))

// to connect to mongoose
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection 

// to check if there is an error in the database
db.on("error", error => console.error(error))

// to check if the database is connected
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)
// for our port 
app.listen(process.env.PORT || 3000) 