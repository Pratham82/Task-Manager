const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.sendgridAPIKey)
sgMail.send({
  to: 'mali.prathamesh82@gmail.com',
  from: 'mali.prathamesh18@gmail.com',
  subject: 'Testing mail 2',
  text: 'Checking it again',
})
