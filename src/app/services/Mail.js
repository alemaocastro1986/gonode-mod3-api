const nodemailer = require('nodemailer')
const mailConfig = require('../../config/mail')
const path = require('path')
const nhbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')

const transport = nodemailer.createTransport(mailConfig)

const viewPath = path.resolve(__dirname, '..', 'views', 'mails')

transport.use(
  'compile',
  nhbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, '_partials')
    }),
    viewPath,
    extName: '.hbs'
  })
)

module.exports = transport
