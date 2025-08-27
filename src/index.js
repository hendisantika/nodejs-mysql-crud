require('dotenv').config()

const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  mysql = require('mysql2'),
  myConnection = require('express-myconnection')

const app = express()

// importing routes
const customerRoutes = require('./routes/customer')

// settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(morgan('dev'))
app.use(
  myConnection(
    mysql,
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    },
    'single'
  )
)

app.use(express.urlencoded({ extended: false }))

// routes
app.use('/', customerRoutes)

// static files
app.use(express.static(path.join(__dirname, 'public')))

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})
